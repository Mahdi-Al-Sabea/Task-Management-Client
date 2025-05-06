import React, { useEffect,useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';




export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchTasks = async (userId) => {
    try {
      const res = await axios.get(`https://localhost:7132/api/Task/User/${userId}`);
      setTasks(res.data);

      const calendarEvents = res.data.map(task => {
        return {
          title: task.title,
          date: task.dueDate, 
      }})
      console.log(calendarEvents);
      setEvents(calendarEvents);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    if (tokenData?.user?.id) {
      fetchTasks(tokenData.user.id);
    }
  }, []);

  return (
    <>
      
      {/* Example of Bootstrap Alert that would actually render */}
      <div style={{ width: '50%', margin: '0 auto' }} className="container-fluid vh-100 d-flex flex-column p-0 mt-4">
        
      <div className="row flex-grow-1 m-0">
        <div className="col p-0">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            height="100%"
            events={events}
          />
        </div>
      </div>
    </div>
    </>
  );
}