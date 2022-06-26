import { useEffect, useState } from 'react';
import getPopulations, { Population } from '../services/get-populations';

const useGetPopulations = (code: string | undefined) => {
  const [populations, setPopulations] = useState<
    | {
        code: string;
        data: Population[];
      }
    | undefined
  >();
  const [loadingCount, setLoadingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoadingCount((c) => c + 1);

      try {
        if (code === undefined || code === current) {
          return;
        }

        setCurrent(code);

        const data = await getPopulations(Number(code));
        setPopulations({ code, data });
      } catch (error) {
        throw new Error();
      } finally {
        setLoadingCount((c) => c - 1);
      }
    };

    void load();
  }, [code, current]);

  useEffect(() => {
    setIsLoading(loadingCount > 0);
  }, [loadingCount]);

  return { populations, isLoading };
};

export default useGetPopulations;
