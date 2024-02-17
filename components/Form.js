import Input from "./Input";

import { monthsToYearsAndMonths } from "../shared/utils";
import { useFormStore } from "../store/form";

const Form = () => {
  const {
    months,
    capital,
    tae,
    startDate,
    vpaAmount,
    vpaInterval,
    setMonths,
    setCapital,
    setTae,
    setStartDate,
    setVpaAmount,
    setVpaInterval,
  } = useFormStore((state) => state);

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
          value={vpaAmount}
          subtitle="How much extra you can pay?"
          step={1}
          min={0}
          onChange={(e) => setVpaAmount(e.target.value)}
        />
        <Input
          type="number"
          label="Voluntary amort. interval"
          step={1}
          min={0}
          value={vpaInterval}
          onChange={(e) => setVpaInterval(e.target.value)}
          subtitle={`${vpaAmount} each ${vpaInterval} months`}
        />
      </div>
    </form>
  );
};

export default Form;
