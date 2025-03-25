import React, { useEffect, useState } from 'react';
import { Gantt, Willow } from 'wx-react-gantt';
import 'wx-react-gantt/dist/gantt.css';

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
          id: item.id,
          text: item.machine_name,
          start: new Date(item.start_time),
          end: new Date(item.end_time),
          duration: Math.round((new Date(item.end_time) - new Date(item.start_time)) / (1000 * 3600)),
          progress: item.progress || 0,
          type: 'task',
          machine_id: item.machine_id,
          work_order_id: item.work_order_id,
          customer: item.customer
        }));

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Willow>
          <Gantt tasks={schedules} />
        </Willow>
      )}
    </div>
  );
};

export default App;
