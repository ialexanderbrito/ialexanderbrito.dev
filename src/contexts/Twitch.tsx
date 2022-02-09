import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import api from 'services/api';

type ITwitchContext = {
  stream: any;
  getTwitch: () => void;
  getLiveOn: () => void;
};

const Twitch = createContext({} as ITwitchContext);

export function TwitchProvider({ children }: any) {
  const [stream, setStream] = useState([]);

  async function getTwitch() {
    api.get('').then((response) => {
      setStream(response.data.stream);
      if (response.data.stream) {
        toast.success(`🟢 Live ON! | ialexanderbrito`);
      }
    });
  }

  async function getLiveOn() {
    api.get('').then((response) => {
      setStream(response.data.stream);
    });
  }

  return (
    <Twitch.Provider
      value={{
        stream,
        getTwitch,
        getLiveOn,
      }}
    >
      {children}
    </Twitch.Provider>
  );
}

export function useTwitch() {
  const context = useContext(Twitch);
  if (!context) {
    throw new Error('useTwitch must be used within a TwitchProvider');
  }
  return context;
}
