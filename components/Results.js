"use client";

import { useMemo } from "react";

import { ChartCard } from "../components/ChartCard";
import { ChartLines } from "../components/ChartLines";
import { ChartPie } from "../components/ChartPie";
import { Table } from "../components/Table";

import { useFormStore } from "../store/form";
import { getAmortizationTable } from "../shared/amortizationTable";
import { ScenarioCards } from "./ScenarioCards";

export const Results = () => {
  const {
    months,
    capital,
    tae,
    startDate,
    vpaAmount,
    vpaInterval,
    currentEuribor,
  } = useFormStore((state) => state);

  const amortizationTable = useMemo(
    () =>
      getAmortizationTable({
        months,
        capital,
        tae: tae + currentEuribor,
        startDate,
        vpaInterval,
        vpaAmount,
      }),
    [months, capital, tae, currentEuribor, startDate, vpaInterval, vpaAmount]
  );

  const worstAmortizationTable = useMemo(
    () =>
      getAmortizationTable({
        months,
        capital,
        tae: tae + 5.393, // 2008 July was the maximum historic euribor
        startDate,
        vpaInterval,
        vpaAmount,
      }),
    [months, capital, tae, startDate, vpaInterval, vpaAmount]
  );

  const bestAmortizationTable = useMemo(() => {
    return getAmortizationTable({
      months,
      capital,
      tae,
      startDate,
      vpaInterval,
      vpaAmount,
    });
  }, [months, capital, tae, startDate, vpaInterval, vpaAmount]);

  const bestScenarioTotalInterests = useMemo(
    () => bestAmortizationTable.reduce((n, { interests }) => n + interests, 0),
    [bestAmortizationTable]
  );

  const regularScenarioTotalInterests = useMemo(
    () => amortizationTable.reduce((n, { interests }) => n + interests, 0),
    [amortizationTable]
  );

  const worstScenarioTotalInterests = useMemo(
    () => worstAmortizationTable.reduce((n, { interests }) => n + interests, 0),
    [worstAmortizationTable]
  );

  return (
    <>
      <ScenarioCards
        best={bestScenarioTotalInterests}
        worst={worstScenarioTotalInterests}
        regular={regularScenarioTotalInterests}
      />
      <div className="h-4" />
      {amortizationTable.length > 0 && (
        <>
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[2fr_1fr] gap-4">
            <ChartCard>
              <ChartLines amortizationTable={amortizationTable} />
            </ChartCard>
            <ChartCard>
              <ChartPie amortizationTable={amortizationTable} />
            </ChartCard>
          </div>
          <div className="h-8" />
          <Table amortizationTable={amortizationTable} />
        </>
      )}
    </>
  );
};
