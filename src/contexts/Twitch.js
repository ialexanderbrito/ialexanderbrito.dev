import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import api from 'services/api';

const Twitch = createContext();

export function TwitchProvider({ children }) {
  const [stream, setStream] = useState([]);
  const dezSegundos = 10000;

  async function permissionNotification() {
    Notification.requestPermission();

    if (Notification.permission === 'granted') {
      //
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();

      setTimeout(() => {
        toast.error('Ative as notificações, para ser notificado sempre!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          id: 'notification-example',
          icon: '😭',
        });
      }, dezSegundos);
    }
  }

  async function notificationTwitch(streamGame, logo) {
    if (Notification.permission === 'granted') {
      const notification = new Notification('🟢 Live ON! | ialexanderbrito', {
        body: `Vem pra Twitch 💜! \r\nJogando ${streamGame}`,
        icon: `${logo}`,
        vibrate: [200, 100, 200],
      });

      notification.onclick = (e) => {
        e.preventDefault();
        window.open('http://www.twitch.tv/ialexanderbrito', '_blank');
      };
    }
  }

  async function getTwitch() {
    api.get('').then((response) => {
      setStream(response.data.stream);
      if (response.data.stream) {
        notificationTwitch(
          response.data.stream.game,
          response.data.stream.channel.logo,
          response.data.stream.preview.medium
        );
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
        permissionNotification,
        notificationTwitch,
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
