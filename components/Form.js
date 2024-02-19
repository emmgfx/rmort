"use client";

import { useCallback, useEffect } from "react";
import { useMountEffect } from "@react-hookz/web";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "./Input";

import { monthsToYearsAndMonths } from "../shared/utils";
import { useFormStore } from "../store/form";

export const Form = ({ currentEuribor: _currentEuribor }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const {
    months,
    capital,
    tae,
    startDate,
    vpaAmount,
    vpaInterval,
    currentEuribor,
    setMonths,
    setCapital,
    setTae,
    setStartDate,
    setVpaAmount,
    setVpaInterval,
    setCurrentEuribor,
  } = useFormStore((state) => state);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    // Months:
    if (Boolean(months)) params.set("months", months);
    else params.delete("months");
    // Capital:
    if (Boolean(capital)) params.set("capital", capital);
    else params.delete("capital");
    // TAE:
    if (Boolean(tae)) params.set("tae", tae);
    else params.delete("tae");
    // Start date:
    if (Boolean(startDate)) params.set("startDate", startDate);
    else params.delete("startDate");
    // VPA amount:
    if (Boolean(vpaAmount)) params.set("vpaAmount", vpaAmount);
    else params.delete("vpaAmount");
    // VPA interval:
    if (Boolean(vpaInterval)) params.set("vpaInterval", vpaInterval);
    else params.delete("vpaInterval");

    router.replace("/?" + params.toString());
  }, [
    capital,
    months,
    router,
    searchParams,
    startDate,
    tae,
    vpaAmount,
    vpaInterval,
  ]);

  useMountEffect(() => {
    if (searchParams.has("months")) setMonths(searchParams.get("months"));
    if (searchParams.has("capital")) setCapital(searchParams.get("capital"));
    if (searchParams.has("tae")) setTae(searchParams.get("tae"));
    if (searchParams.has("startDate"))
      setStartDate(searchParams.get("startDate"));
    if (searchParams.has("vpaAmount"))
      setVpaAmount(searchParams.get("vpaAmount"));
    if (searchParams.has("vpaInterval"))
      setVpaInterval(searchParams.get("vpaInterval"));
    setCurrentEuribor(_currentEuribor);
  });

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
          subtitle={`Your TAE (+${_currentEuribor} Euribor)`}
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
