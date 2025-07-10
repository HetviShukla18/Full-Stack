import { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const dateString = currentTime.toLocaleDateString();
  const timeString = currentTime.toLocaleTimeString();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {dateString}</h2>
      <h2>It is {timeString}</h2>
    </div>
  );
}

export default App;
