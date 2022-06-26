import ky from 'ky';

export type Population = {
  year: number;
  value: number;
};

const getPopulations = async (code: number): Promise<Population[]> => {
  const client = ky.create({
    prefixUrl: 'https://opendata.resas-portal.go.jp/api/v1/',
    headers: { 'X-API-KEY': process.env.apiKey },
  });

  const res = await client
    .get('population/composition/perYear', {
      searchParams: {
        cityCode: '-',
        prefCode: code,
      },
    })
    .json<{
      message: string;
      result: {
        data: { label: string; data: { year: number; value: number }[] }[];
      };
    }>();

  const { result } = res;
  if (result === undefined) {
    throw new Error(res.message);
  }

  for (let i = 0; i < result.data.length; i += 1) {
    const data = result.data[i];
    if (data.label === '総人口') {
      return data.data;
    }
  }

  return [];
};

export default getPopulations;
