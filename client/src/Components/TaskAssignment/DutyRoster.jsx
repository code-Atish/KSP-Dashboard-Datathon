// src/DutyRoster.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignDutyModal from './AssignDutyModal';
import styles from  './index.module.css'
import DialogDemo from '../../ui/Dialog/Dialog';
import { Description } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { cron_mapper } from '../../utils/utility';
const daysOfWeek = [
  { day: 'Sunday', cron_time: '0 0 * * 0' },
  { day: 'Monday', cron_time: '0 0 * * 1' },
  { day: 'Tuesday', cron_time: '0 0 * * 2' },
  { day: 'Wednesday', cron_time: '0 0 * * 3' },
  { day: 'Thursday', cron_time: '0 0 * * 4' },
  { day: 'Friday', cron_time: '0 0 * * 5' },
  { day: 'Saturday', cron_time: '0 0 * * 6' },
];
const duties = ['Patrol', 'Desk Duty', 'Investigation', 'Surveillance'];
const apiUrl = import.meta.env.VITE_API_URL;

const DutyRoster = () => {
  const [roster, setRoster] = useState({});
  const [officers, setOfficers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentDuty, setCurrentDuty] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [selectedPS,setSelectedPS] = useState('')
  const [onboardOfficersbyPs, setOnboardOfficersbyPs]=useState([])
  useEffect(() => { 
    // Initialize roster state
    setRoster(
      duties.reduce((acc, duty) => {
        acc[duty] = daysOfWeek.reduce((dayAcc, days) => {
          dayAcc[days.day] = [];
          return dayAcc;
        }, {});
        return acc;
      }, {})
    );
  }, []);

  const fetchOfficersByPS = async () => {
    try {
      const res = await axios.post(`${apiUrl}/getofficersByPS`, {
        PS : selectedPS
      }, {
        headers: {
          "jwt_token": localStorage.getItem('token')
        }
      })
      console.log(res.data) 
      res.data.forEach(duty => {
        console.log(duty)
        const officer = officers.find(officer => duty.userid === officer.id);
              setRoster(roster => {
                const existingArray = roster[duty.title]?.[cron_mapper[duty.cron_time]] || [];
                const newArray = [...existingArray, { ...officer, userid: officer.id, id: duty.id }];
                
                return {
                  ...roster,
                  [duty.title]: {
                    ...roster[duty.title],
                    [cron_mapper[duty.cron_time]]: newArray,
                  },
                };
              });
            });
      setOnboardOfficersbyPs(res.data)
    } catch (error) {
      console.log('error while fetching : ', error)
    }
  }

  useEffect(() => {
    if(!selectedPS)
      return;
    setRoster(
      duties.reduce((acc, duty) => {
        acc[duty] = daysOfWeek.reduce((dayAcc, days) => {
          dayAcc[days.day] = [];
          return dayAcc;
        }, {});
        return acc;
      }, {})
    );
    fetchOfficersByPS()
    console.log(roster)
    console.log("desk duty at monday: ",roster['Desk Duty']['Monday'])
    }, [selectedPS]);
  useEffect(() => {
    // Fetch officers
    const fetchOfficers = async () => {
      try {
        const res = await axios.post(`${apiUrl}/getofficers`, {}, {
          headers: {
            "jwt_token": localStorage.getItem('token')
          }
        })
        console.log(res.data)
        setOfficers(res.data)
      } catch (error) {
        console.log('error while fetching : ', error)
      }
    }
    fetchOfficers()
    }, []);
  const handleCellClick = (duty, day) => {
    setCurrentDuty(duty);
    setCurrentDay(day);
    setModalShow(true);
  };

  const assignDuty = async (selectedOfficer, duty, days, dutyDescription) => {
    let toastId;
    try {
      toastId = toast.loading('Asssigning Duty...');
      console.log(selectedOfficer.id, duty, days,dutyDescription)
      const res = await axios.post(`${apiUrl}/schedule-task`, {
       userid:  selectedOfficer.id,
        title : duty,
        cron_time : days.cron_time,
        description:  dutyDescription,
        police_station : selectedPS
      });
      console.log(res.data)
      toast.remove(toastId);
      toast.success('Duty assigned successfully');
      const officer = officers.find(officer => officer.id === selectedOfficer.id);
      setRoster(roster => {
        const updatedDuties = [...(roster[duty][days.day] || []), { ...officer, userid: officer.id, id: res.data.id }];
        return {
        ...roster,
        [duty]: {
          ...roster[duty],
          [days.day]: updatedDuties,
        },
      }});
    } catch (error) {
      toast.remove(toastId);
      toast.error('Failed to assign duty');
      console.error('Error assigning duty:', error);
    }
  };
  const handleRemoveOfficer =async (officer,duty,days) =>{
    console.log(officer)
    let toastId;
    try {
      toastId = toast.loading('Removing Officer...');
      const response = await axios.delete(`${apiUrl}/stop-task`, {
        params: { task_id: officer.id }
      },{});
      toast.remove(toastId);
      toast.success(response.data)
      setRoster(roster => {
        const updatedDuties = roster[duty][days.day].filter(duty => duty.userid !== officer.userid);
        return{
        ...roster,
        [duty]: {
          ...roster[duty],
          [days.day]: updatedDuties,
        },
      }});
    } catch (error) {
      console.error('Error removing officer:', error);
      toast.remove(toastId);
      toast.error('Failed to remove officer');
    }
  }

  const handleChange = (event) => {
    setSelectedPS(event.target.value);
  }
  return (
    <div>
      <div className={styles.PS_selector}>
          Select Police station  
          <select value={selectedPS} onChange={handleChange}>
              <option value = {'PS1'}>PS1</option>
              <option value = {'PS2'}>PS2</option>
          </select>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Duty</th>
            {daysOfWeek.map(days => (
              <th key={days.day}>{days.day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {duties.map(duty => (
            <tr key={duty}>
              <td style={{color : '#64748b'}}>{duty}</td>
              {daysOfWeek.map((days,index) => (
                <td key={days.day} className={styles.duty_cell}>
                  <div className={styles.assigned_officer_cell}>
                    {roster[duty] && roster[duty][days.day].map((officer, index) => (
                      <div
                        key={index}
                        className={styles.assigned_officer_cell}
                        // onClick={() => handleCellClick(duty, days)}
                      >
                        {officer.ioname}
                      </div>
                    ))}
                    {/* {roster[duty] && roster[duty][days.day].ioname || ''} */}
                  </div>
                  <div className={styles.add_btn_wrapper}>
                    <DialogDemo id={index} duty={duty} days={days} assignDuty={assignDuty} officers={officers} setRoster={setRoster} handleRemoveOfficer={handleRemoveOfficer} roster={roster}/>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <AssignDutyModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        duty={currentDuty}
        day={currentDay}
        assignDuty={assignDuty}
      />
    </div>
  );
};

export default DutyRoster;
