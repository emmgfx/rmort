import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = ["#f8dc46", "#82ca9d", "#f44336"];

const ChartPie = ({ amortizationTable = [] }) => {
  const capitalMandatory = amortizationTable.reduce((acc, row) => {
    if (row.type === "mandatory") return acc + row.amortization;
    return acc;
  }, 0);
  const capitalVoluntary = amortizationTable.reduce((acc, row) => {
    if (row.type === "voluntary") return acc + row.amortization;
    return acc;
  }, 0);
  const interests = amortizationTable.reduce(
    (acc, row) => acc + row.interests,
    0
  );

  console.log({ capitalMandatory, capitalVoluntary, interests });
  const data = [
    {
      name: "Capital (M)",
      value: Math.round(capitalMandatory * 100) / 100,
    },
    {
      name: "Capital (V)",
      value: Math.round(capitalVoluntary * 100) / 100,
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
          isAnimationActive={false}
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
