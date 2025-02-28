import { useState, useEffect } from 'react';

export function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();

    if (hours < 12) {
      setTimeOfDay('dia');
    } else if (hours < 18) {
      setTimeOfDay('tarde');
    } else {
      setTimeOfDay('noite');
    }
  }, []);

  return timeOfDay;
}
