const Table = ({ values }) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-3">Date</th>
          <th className="py-3">Month</th>
          <th className="py-3">Year</th>
          <th className="py-3">Fee</th>
          <th className="py-3">Amortization</th>
          <th className="py-3">Interests</th>
          <th className="py-3">Interests sumatory</th>
          <th className="py-3">Pending</th>
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index} className="my-2">
            <th>{new Date(row.date).toISOString().substring(0, 10)}</th>
            <th>{row.month}</th>
            <th>{row.year}</th>
            <th>{new Intl.NumberFormat({}).format(row.fee)}</th>
            <th>{new Intl.NumberFormat({}).format(row.amortization)}</th>
            <th>{new Intl.NumberFormat({}).format(row.interests)}</th>
            <th>{new Intl.NumberFormat({}).format(row.interestsTotal)}</th>
            <th>{new Intl.NumberFormat({}).format(row.pendingCapital)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
