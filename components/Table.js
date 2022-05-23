import classNames from "classnames";
import { numberFormat } from "../shared/utils";

const Table = ({ amortizationTable }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Month</th>
            <th className="px-3 py-2">Year</th>
            <th className="px-3 py-2">Fee</th>
            <th className="px-3 py-2">Amortization</th>
            <th className="px-3 py-2">Interests</th>
            <th className="px-3 py-2">Interests sumatory</th>
            <th className="px-3 py-2">Pending</th>
          </tr>
        </thead>
        <tbody>
          {amortizationTable.map((row, index) => (
            <tr
              key={index}
              className={classNames(
                "text-sm transition ease-in-out hover:bg-indigo-900 rounded-md overflow-hidden",
                index % 2 === 0 && "bg-white/5",
                row.type === "voluntary" && "bg-green-800",
                row.type === "voluntary" && "hover:bg-green-500"
              )}
            >
              <td className="px-3 py-2">
                {new Date(row.date).toISOString().substring(0, 7)}
              </td>
              <td className="px-3 py-2">{row.month}</td>
              <td className="px-3 py-2">{row.year + 1}</td>
              <td className="px-3 py-2 text-yellow-300">
                {numberFormat(row.fee)}
              </td>
              <td className="px-3 py-2 text-green-500">
                {numberFormat(row.amortization)}
              </td>
              <td className="px-3 py-2 text-red-500">
                {numberFormat(row.interests)}
              </td>
              <td className="px-3 py-2">
                {numberFormat(row.interestsSumatory)}
              </td>
              <td className="px-3 py-2">{numberFormat(row.pendingCapital)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
