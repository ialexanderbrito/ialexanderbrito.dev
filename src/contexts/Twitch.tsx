import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { getStreamer } from 'services/getStreamer';

type ITwitchContext = {
  stream: any;
  getTwitch: () => void;
  getLiveOn: () => void;
};

const Twitch = createContext({} as ITwitchContext);

export function TwitchProvider({ children }: any) {
  const [stream, setStream] = useState([]);

  async function getTwitch() {
    const response = await getStreamer(74480710);

    setStream(response.data.stream);

    if (response.data.stream) {
      toast.success(`Live ON! | ialexanderbrito`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: '🟢 ',
        theme: 'dark',
      });
    }
  }

  async function getLiveOn() {
    const response = await getStreamer(74480710);

    setStream(response.data.stream);
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
