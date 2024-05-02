export const fetchHygraph = async (query: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_HOST!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate: 1, // seconds
      tags: ['00fdsur123gfdgdfgfuytidgfdfdsfjhgfdsdfdfgdfdggfgfdgjytujytygfdgdfgdrds0'],
    },
  });

  const { data } = await response.json();

  return data;
};
