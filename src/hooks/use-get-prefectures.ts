import { useEffect, useState } from 'react';
import getPrefectures, { Prefecture } from '../services/get-prefectures';

const useGetPrefectures = () => {
  const [prefectures, setPrefectures] = useState<{
    [code: string]: Prefecture;
  }>({});
  const [loadingCount, setLoadingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingCount((c) => c + 1);

      try {
        const data = await getPrefectures();
        const temp: { [code: string]: Prefecture } = {};
        data.forEach((d) => {
          temp[d.prefCode] = d;
        });
        setPrefectures(temp);
      } catch (error) {
        throw new Error();
      } finally {
        setLoadingCount((c) => c - 1);
      }
    };

    void load();
  }, []);

  useEffect(() => {
    setIsLoading(loadingCount > 0);
  }, [loadingCount]);

  return { prefectures, isLoading };
};

export default useGetPrefectures;
