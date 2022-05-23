import { useState, useEffect } from "react";

import Input from "./Input";

import getAmortizationTable from "../shared/amortizationTable";
import { monthsToYearsAndMonths } from "../shared/utils";

const Form = ({ onNewAmortizationTable = () => {} }) => {
  const [months, setMonths] = useState(0);
  const [capital, setCapital] = useState(0);
  const [tae, setTae] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [VPAAmount, setVPAAmount] = useState(0);
  const [VPAInterval, setVPAInterval] = useState(0);

  useEffect(() => {
    if (months <= 0 || months > 480 || tae <= 0 || capital <= 0) {
      onNewAmortizationTable([]);
      return;
    }

    const amortizationTable = getAmortizationTable({
      months,
      capital,
      tae,
      startDate,
      VPAInterval,
      VPAAmount,
    });

    onNewAmortizationTable(amortizationTable);
  }, [
    months,
    capital,
    tae,
    startDate,
    VPAInterval,
    VPAAmount,
    onNewAmortizationTable,
  ]);

  return (
    <form>
      <div className="grid grid-cols-2 gap-4 gap-y-8">
        <Input
          label="Remaining months:"
          subtitle={monthsToYearsAndMonths(months)}
          type="number"
          min={0}
          max={480}
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />
        <Input
          label="Remaining capital:"
          subtitle="Currency agnostic"
          type="number"
          min={0}
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
        <Input
          label="TAE:"
          type="number"
          subtitle="Your current TAE"
          min={0.01}
          max={30}
          step={0.01}
          value={tae}
          onChange={(e) => setTae(e.target.value)}
        />
        <Input
          label="Start date:"
          type="date"
          value={startDate}
          subtitle="Optional"
          onChange={(e) => setStartDate(e.target.value)}
          style={{ colorScheme: "dark" }}
        />
        <Input
          type="number"
          label="Voluntary amort. amount"
          value={VPAAmount}
          subtitle="How much extra you can pay?"
          step={1}
          min={0}
          onChange={(e) => setVPAAmount(e.target.value)}
        />
        <Input
          type="number"
          label="Voluntary amort. interval"
          step={1}
          min={0}
          value={VPAInterval}
          onChange={(e) => setVPAInterval(e.target.value)}
          subtitle={`${VPAAmount} each ${VPAInterval} months`}
        />
      </div>
      {/* <div className="h-6" /> */}
      {/* <h3 className="text-xl font-bold uppercase flex items-center gap-8">
        Voluntary periodic amortization
      </h3> */}
      {/* <div className="h-6" /> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
    </form>
  );
};

export default Form;
