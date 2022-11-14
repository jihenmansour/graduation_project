import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment"
import 'moment/locale/fr-ca';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import { CalendarToolbar } from "./CalendarToolbar";



export const StyleWrapper = styled.div
 `
.rbc-off-range-bg{
  background-color:white;
}
.rbc-month-row{
  overflow:visible;
}
.rbc-event{ 
  background-color:rgb(146, 103, 255);
}
`

export default function Eventcalendar(props) {
    const localizer = momentLocalizer(moment);
    const [emps, setEmps] = useState([]);
    const [value,setValue] = useState(false);
    let userData = JSON.parse(localStorage.getItem('theme'));
    let idData= JSON.parse(localStorage.getItem('key'));
    const events = [];
  useEffect(() => {
    getEms()
    },[]);
     const getEms = () => {
      fetch('https://localhost:44314/api/Table/'+idData+'&'+userData)
      .then(res => res.json())
      .then(res => {
        setEmps(res)
        res.forEach(element => {
          events.push(        {
            title: element.subject,
            start: new Date(element.created_on),
            end: new Date(element.closed_on),
            issue_status:element.issue_status,
        }) 
          });
        setValue(true)
      })
     }

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
    return (
      <StyleWrapper>
            <Calendar localizer={localizer} views={['month']} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 580, margin: "50px" }}
              components={{toolbar: CalendarToolbar}}
              eventPropGetter={(event) => {
                const backgroundColor = event.issue_status=='À Faire' ? 'rgb(255, 77, 79)'  
                : event.issue_status=='En Cours'? 'rgb(254, 176, 25)'
                : event.issue_status=='En Attente' ? 'rgb(0, 143, 251)' 
                : 'rgb(0, 227, 150)';
                return { style: { backgroundColor } }
              }}
              popup={true}
              messages={{ showMore: (target) => <span className="ml-2" role="presentation" 
              onClick={() => ({ calendarOverlay: true, currentTitleData: {} })}>
                 ...{target} plus</span> }}/>
        </StyleWrapper>
    );
}
