import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import HomeTemplate, { Item } from '../components/templates/HomeTemplate';
import useGetPopulations from '../hooks/use-get-populations';
import useGetPrefectures from '../hooks/use-get-prefectures';
import { Population } from '../services/get-populations';

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [fetchCode, setFetchCode] = useState<string | undefined>();
  const [checks, setChecks] = useState<{ [code: string]: boolean }>({});
  const [stored, setStored] = useState<{ [code: string]: Population[] }>({});
  const [data, setData] = useState<{ year: number; [name: string]: number }[]>(
    [],
  );
  const { prefectures, isLoading } = useGetPrefectures();
  const { populations, isLoading: isPopulationLoading } =
    useGetPopulations(fetchCode);

  useEffect(() => {
    const list = Object.keys(prefectures).map((code) => {
      const p = prefectures[code];

      return {
        id: p.prefCode,
        label: p.prefName,
        checked: checks[code] ?? false,
        handleClick: () => {
          setChecks({ ...checks, [code]: !(checks[code] ?? false) });
        },
      };
    });

    setItems(list);
  }, [prefectures, checks]);

  useEffect(() => {
    if (populations === undefined) return;
    setStored((current) => {
      return { [populations.code]: populations.data, ...current };
    });
  }, [populations]);

  useEffect(() => {
    const checkedCode: string[] = [];
    Object.keys(checks).forEach((c) => {
      const check = checks[c];
      if (!check) return;
      checkedCode.push(c);
    });

    const temp: {
      [year: string]: { year: number; [name: string]: number };
    } = {};

    checkedCode.forEach((code) => {
      if (stored[code] === undefined) {
        setFetchCode(code);

        return;
      }

      stored[code].forEach((population) => {
        if (!temp[population.year]) {
          temp[population.year] = { year: population.year };
        }
        temp[population.year] = {
          ...temp[population.year],
          [prefectures[code].prefName]: population.value,
        };
      });
    });

    setData(Object.keys(temp).map((y) => temp[y]));
  }, [prefectures, checks, stored]);

  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <HomeTemplate
      title="title"
      items={items}
      data={data}
      isDataLoading={isPopulationLoading}
    />
  );
};

export default Home;
