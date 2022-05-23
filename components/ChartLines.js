import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartLines = ({ amortizationTable = [] }) => {
  const data =
    amortizationTable.length > 12
      ? amortizationTable
          .map((row, index, rows) => {
            if (row.year === rows[index - 1]?.year || 0) return null;
            return {
              name: `Year ${row.year}`,
              Fee: row.fee,
              Interests: row.interests,
            };
          })
          .filter((row) => row !== null)
      : amortizationTable.map((row, index) => ({
          name: `Month ${row.month}`,
          Fee: row.fee,
          Interests: row.interests,
        }));

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Line
          type="monotone"
          dataKey="Fee"
          stroke="#82ca9d"
          strokeWidth={4}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="natural"
          dataKey="Interests"
          stroke="#f44336"
          strokeWidth={4}
          dot={false}
          isAnimationActive={false}
        />
        <CartesianGrid strokeWidth=".5" stroke="#6366f1" />
        <XAxis dataKey="name" stroke="#e0e6fe" />
        <YAxis stroke="#e0e6fe" />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartLines;
