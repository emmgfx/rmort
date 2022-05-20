import { useState, useEffect } from "react";

const Form = ({ onValuesUpdated = () => {} }) => {
  const [months, setMonths] = useState(0);
  const [capital, setCapital] = useState(0);
  const [tae, setTae] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  useEffect(() => {
    if (months <= 0 || months > 480 || tae <= 0 || capital <= 0) {
      onValuesUpdated([]);
      return;
    }

    const fees = [];

    const originalRemainingMonths = months;
    const originalRemainingCapital = capital;
    let interestsTotal = 0;
    let pendingCapital = originalRemainingCapital;
    let month = 0;
    let year = 0;
    let date = new Date(startDate);

    while (
      Math.round(pendingCapital * 100) / 100 > 0 &&
      month <= originalRemainingMonths
    ) {
      let fee =
        Math.round(
          ((pendingCapital * (tae / 12)) /
            (100 *
              (1 -
                Math.pow(
                  1 + tae / 12 / 100,
                  month - originalRemainingMonths
                )))) *
            100
        ) / 100;
      let interests =
        Math.round(((pendingCapital * (tae / 12)) / 100) * 100) / 100;
      let amortization = fee - interests;
      let _date = new Date(date);
      _date.setDate(_date.getMonth() + 1);

      month++;
      interestsTotal += interests;
      pendingCapital -= amortization;

      fees.push({
        type: "mandatory",
        originalRemainingMonths: originalRemainingMonths,
        originalRemainingCapital: originalRemainingCapital,
        month: month,
        year: Math.floor((month - 1) / 12),
        fee: fee,
        tae: tae,
        interests: interests,
        interestsTotal: interestsTotal,
        pendingCapital: pendingCapital,
        amortization: amortization,
        date: _date,
      });
    }

    onValuesUpdated(fees);
  }, [months, capital, tae, startDate]);

  return (
    <form className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className="block mb-2 text-sm font-bold uppercase">
          Remaining months:
        </label>
        <input
          type="number"
          min={0}
          max={480}
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="text-indigo-100 font-bold rounded w-full bg-indigo-900 border-indigo-900 border-2 focus:ring-0 focus:border-indigo-500"
        />
        <div className="h-2" />
        <div className="text-sm text-slate-300 text-right">
          {monthsToYearsAndMonths(months)}
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-bold uppercase">
          Remaining capital:
        </label>
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          className="text-indigo-100 font-bold rounded w-full bg-indigo-900 border-indigo-900 border-2 focus:ring-0 focus:border-indigo-500"
        />
        <div className="h-2" />
        <div className="text-sm text-slate-300 text-right">
          Currency agnostic
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-bold uppercase">TAE:</label>
        <input
          type="number"
          value={tae}
          onChange={(e) => setTae(e.target.value)}
          className="text-indigo-100 font-bold rounded w-full bg-indigo-900 border-indigo-900 border-2 focus:ring-0 focus:border-indigo-500"
          min={0.01}
          max={30}
          step={0.01}
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-bold uppercase">
          Start date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ colorScheme: "dark" }}
          className="text-indigo-100 font-bold rounded w-full bg-indigo-900 border-indigo-900 border-2 focus:ring-0 focus:border-indigo-500"
        />
      </div>
    </form>
  );
};

const monthsToYearsAndMonths = (months) => {
  const years = Math.floor(months / 12);
  const monthsLeft = months % 12;
  return monthsLeft === 0
    ? `${years} years`
    : `${years} years and ${monthsLeft} months`;
};

export default Form;
