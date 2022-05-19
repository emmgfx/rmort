import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Form from "../components/Form";
import Table from "../components/Table";

export default function Home() {
  const [values, setValues] = useState([]);

  // const data = [
  //   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  // ];

  // const data = ;
  const data =
    values.length > 12
      ? values
          .map((row, index, rows) => {
            console.log(rows);
            if (row.year === rows[index - 1]?.year || 0) return null;
            return {
              name: `Year ${row.year}`,
              Fee: row.fee,
              amortization: row.amortization,
              Interests: row.interests,
              interestsTotal: row.interestsTotal,
              pendingCapital: row.pendingCapital,
            };
          })
          .filter((row) => row !== null)
      : values.map((row, index) => ({
          name: `Month ${row.month}`,
          fee: row.fee,
          amortization: row.amortization,
          interests: row.interests,
          interestsTotal: row.interestsTotal,
          pendingCapital: row.pendingCapital,
        }));

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-extrabold">RMORT? What&apos;s this?</h1>
      <div className="h-4" />
      <p>
        This page was made to help you to understand how you money can fly away
        with a mortgage and how much relevant are the periodical amortizations.
        Simply fill in the form and you will get a table with the amortization
        table and a graph.
      </p>
      <div className="h-2" />
      <p>
        The name &quot;RMORT&quot; doesn&apos;t means anything special,
        it&apos;s just R<del className="text-white/50">EACT</del>MORT
        <del className="text-white/50">GAGE</del>.
      </p>
      <div className="h-8" />
      <Form onValuesUpdated={(values) => setValues(values)} />
      <div className="h-8" />

      {values.length > 0 && (
        <>
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div
              className="bg-indigo-900 rounded-xl p-3"
              style={{ width: "100%", height: 300 }}
            >
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="Fee"
                    stroke="#82ca9d"
                    strokeWidth={4}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Interests"
                    stroke="#f44336"
                    strokeWidth={4}
                    dot={false}
                  />
                  <CartesianGrid strokeWidth=".5" stroke="#6366f1" />
                  <XAxis dataKey="name" stroke="#e0e6fe" />
                  <YAxis stroke="#e0e6fe" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div
              className="bg-indigo-900 rounded-xl p-3"
              style={{ width: "100%", height: 300 }}
            >
              Disco con los intereses vs total
            </div>
          </div>
          <div className="h-8" />

          <Table values={values} />
        </>
      )}

      {/* <pre className="text-[10px]">
        <code>{JSON.stringify(values, null, 2)}</code>
      </pre> */}
    </div>
  );
}
