import React, {useEffect, useState} from 'react';

import { Gantt } from "wx-react-gantt";
import { Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css"; //import theme

const App = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/schedules');
        const data = await response.json();
        
        const transformedData = data.map(item => ({
          id: item.customer,
          text: item.machine_name,
          start: new Date(item.start_time),
          end: new Date(item.end_time),
          duration: Math.round((new Date(item.end_time) - new Date(item.start_time)) / (1000 * 3600 * 24)),
          progress: item.progress || 0, 
          type: "task",
          machine_id: item.machine_id,
          work_order_id: item.work_order_id,
          customer: item.customer
        },console.log(item)));

        setSchedules(transformedData);
      } catch (error) {
        console.error('Fetch hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <Willow>
      <Gantt tasks={schedules} />
    </Willow>
  );
};

export default App;