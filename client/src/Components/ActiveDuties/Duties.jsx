import React from 'react'
import "../Officers/Inspectors/inspect.css";
import CountdownTimer from "./CountdownTimer";
const statusStyles= {
'Active' : {
    text : 'In Progress',
    style: {
    padding: "5px 10px",
    borderRadius: "15px",
    color: "hsl(14, 80%, 30%)",
    background: "hsl(43, 83%, 55%)",
  }},
  'Completed' : {
    text : 'Completed',
    style: {
    padding: "5px 10px",
    borderRadius: "15px",
    color: "hsl(129,46%,27%)",
    background: "hsl(132,100%,79%)",
  }},
  "Pending" : {
    text : 'Pending',
    style : {
    padding: "5px 10px",
    borderRadius: "15px",
    color: 'hsl(344,100%,98%)',
    background : 'hsl(0,82%,65%)',
  }}
}
export default function Duties({dutyList, title, setCompleteDuty}) {
  return (
    <div>
       <div>
      <h2 className="inspector-title">{title} Duties</h2>
      <div className="table-wrapper">
        <div className="table-heading-wrapper">
          <div className="duty table-heading">
            <div className="table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Title</h5>
            </div>
            {/* <div className="text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Visitors</h5>
            </div> */}
            <div className="text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Description</h5>
            </div>
            {/* <div className="hidden text-center table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Sales</h5>
            </div> */}
            <div className="hidden text-center  table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Status</h5>
            </div>
            {title!=='Completed' && <div className="hidden text-center  table-heading-col-wrapper">
              <h5 className="table-heading-header-cont">Time Left</h5>
            </div>}
          </div>

          {dutyList && dutyList.length>0 &&
            dutyList.map((duty, key) => (
              <div
                className={`duty table-list-content ${
                  key === dutyList.length - 1 ? "" : "bottom-border"
                }`}
                key={key}
              >
                <div className="brand-logo-wrapper">
                  <p className="brand-name">{duty.title}</p>
                </div>
                <div className="brand-visitor-revenue">
                  <p style={{ color: "#000000" }}>{duty.description}</p>
                </div>
                <div className="brand-visitor-revenue">
                  <p style={statusStyles[title].style}>
                    {statusStyles[title].text}
                  </p>
                </div>
              {title=='Active'&&  <div className="brand-visitor-revenue">
                  <p style={{ color: "#000000" }}>
                    {new Date(duty.deadline) > new Date() ? <CountdownTimer deadline={duty.deadline} /> : '---'}
                  </p>
                </div>}

                {/* <div className="brand-visitor-revenue">
                <p style={{ color: "#000000" }}>{brand.sales}</p>
              </div> */}

             {title!=='Completed' && <div className="brand-visitor-revenue">
                <button onClick={() => setCompleteDuty(duty.id)} className="inspector-details">Mark as Done</button>
              </div>}
              </div>
            ))}
        </div>
      </div>
      {/* <ul>
        {activeDuties.length>0 && activeDuties.map((duty) => (
          <li key={duty.id} className={styles.duty_cell}>
            <p className={styles.assigned_officer_cell}>{duty.title}</p>
            <p className={styles.duty_cell}>{duty.desription}</p>
            <p className={styles.duty_cell}>{duty.deadline}</p>
          </li>
        ))}
      </ul> */}
    </div>
    </div>
  )
}
