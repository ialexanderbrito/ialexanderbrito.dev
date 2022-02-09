import axios from 'axios';

const twitchAPI = 'https://api.twitch.tv/kraken/streams';

const api = axios.create({
  baseURL: `${twitchAPI}/74480710`,
  headers: {
    'Client-Id': `l4ulgpuzjl21kfkklj0k7aycw7ho72o`,
    Accept: `application/vnd.twitchtv.v5+json`,
  },
});

export default api;
