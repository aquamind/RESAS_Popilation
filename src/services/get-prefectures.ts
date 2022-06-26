import ky from 'ky';

export type Prefecture = {
  prefCode: string;
  prefName: string;
};
console.log(process.env);

const getPrefectures = async (): Promise<Prefecture[]> => {
  const client = ky.create({
    prefixUrl: 'https://opendata.resas-portal.go.jp/api/v1/',
    headers: { 'X-API-KEY': process.env.apiKey },
  });

  const res = await client
    .get('prefectures')
    .json<{ message: string; result: Prefecture[] }>();

  const { result } = res;
  if (result === undefined) {
    throw new Error(res.message);
  }

  return result;
};

export default getPrefectures;
