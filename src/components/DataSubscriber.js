/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const DataContext = React.createContext(null);
const DataSubscriber = ({ children, url, limit = 30}) => {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const useAutoClean = (state, setState, limit) => {
    useEffect(() => {
      if (state.length > limit) {
        setState(t => t.slice(1));
      }
    }, [state]);
  };

  useEffect(() => {
    const socket = io(url);
    socket.on('temperature', data => setTemperature(t => [...t, data]));
    socket.on('humidity', data => setHumidity(t => [...t, data]));

    return () => socket.close();
  }, [url]);

  useAutoClean(temperature, setTemperature, limit);
  useAutoClean(humidity, setHumidity, limit);

  return (
    <DataContext.Provider
      value={{ temperature, humidity }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataSubscriber;

