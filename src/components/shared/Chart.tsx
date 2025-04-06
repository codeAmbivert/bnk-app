import React from "react";
import { XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface ChartCompProps {
  data: { name: string; uv: number; pv: number; amt: number }[];
}

const ChartComp: React.FC<ChartCompProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={500} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#FF5403" />
          <Tooltip />
          <XAxis
            dataKey="name"
            stroke="#DBDEE5"
            interval={0}
            tickFormatter={(value, index) => {
              if (index === 0 || index === data.length - 1) {
                return value;
              }
              return "";
            }}
            tick={(props) => <CustomTick {...props} dataLength={data.length} />}
            dy={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTick = ({
  x,
  y,
  payload,
  index,
  dataLength,
}: {
  x: number;
  y: number;
  payload: { value: string };
  index: number;
  dataLength: number;
}) => {
  const isFirst = index === 0;
  const isLast = index === dataLength - 1;

  if (!isFirst && !isLast) return null;

  return (
    <text
      x={x}
      y={y + 10}
      textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
      fontSize={12}
      fill="#5E6C84"
    >
      {payload.value}
    </text>
  );
};

export default ChartComp;
