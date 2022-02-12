import api from './api';

export async function getStreamer(id: number) {
  const { data, status } = await api.get(`/streams/${id}`);
  return { data, status };
}
