import React, { FC } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  data: {
    year: number;
    [name: string]: number;
  }[];
};
const ChartBox: FC<Props> = ({ data }) => {
  const names = new Set<string>();
  data.forEach((d) => {
    Object.keys(d).forEach((v) => {
      if (v === 'year') return;
      names.add(v);
    });
  });

  console.log(data);

  return (
    <div style={{ width: '100vw', height: '50vh' }}>
      <ResponsiveContainer width="80%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 100,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year">
            <Label value="年" position="right" />
          </XAxis>
          <YAxis label={{ value: '人口', position: 'left' }} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" layout="vertical" />
          {Array.from(names).map((name) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke="#8884d8"
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBox;
