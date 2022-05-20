import {
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const COLORS = ["#82ca9d", "#f44336"];

const ChartPie = ({ values = [] }) => {
  const capital = values.reduce((acc, row) => acc + row.amortization, 0);
  const interests = values.reduce((acc, row) => acc + row.interests, 0);

  const data = [
    {
      name: "Capital",
      value: Math.round(capital * 100) / 100,
    },
    { name: "Interests", value: Math.round(interests * 100) / 100 },
  ];
  return (
    <ResponsiveContainer>
      <PieChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          stroke="#312e81"
          label
          // paddingAngle={5}
          // strokeWidth={0}
          // labelLine
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default ChartPie;
