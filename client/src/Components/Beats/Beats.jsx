import React, { useState } from 'react';
import './beats.css';
import axios from 'axios';
import toast from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_API_URL;
const Beats = () => {
  const [formData, setFormData] = useState({
    beatName: '',
    beatId: '',
    date: '',
    patrolStart: '',
    patrolEnd: '',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let toastId;
    try {
        toastId = toast.loading('Submitting patrol log...');
        const response = await axios.post(`${apiUrl}/submitbeatlog`, formData,{
            headers: {
                "jwt_token" : localStorage.getItem('token')
            },
        });
        console.log('resposne is : ',response);
        if (response.statusText=='Created' && response.status == 201) { // Check the response status code
            toast.success('Beat log submitted successfully!');
            setFormData({
                beatName: '',
                beatId: '',
                date: '',
                patrolStart: '',
                patrolEnd: '',
                observations: ''
            });
        } else {
            throw new Error('Failed to submit patrol log');
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to submit passive log');
    } finally {
        toast.remove(toastId);
    }
    // console.log(formData);
};
  return (
    <form className="patrol-log-form" onSubmit={handleSubmit}>
      <h2>Patrol Log Entry</h2>
      
      <div className="form-group">
        <label htmlFor="beatName">Beat Name:</label>
        <input
          type="text"
          id="beatName"
          name="beatName"
          value={formData.beatName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="beatId">Beat ID:</label>
        <input
          type="text"
          id="beatId"
          name="beatId"
          value={formData.beatId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="patrolStart">Time of Patrol Start:</label>
        <input
          type="time"
          id="patrolStart"
          name="patrolStart"
          value={formData.patrolStart}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="patrolEnd">Time of Patrol End:</label>
        <input
          type="time"
          id="patrolEnd"
          name="patrolEnd"
          value={formData.patrolEnd}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="observations">Observations or Concerns:</label>
        <textarea
          id="observations"
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>
    <div className="submit-btn-wrapper">
      <button type="submit" className="submit-btn">Submit</button>
    </div>
    </form>
  );
};

export default Beats;
