import { useState, useCallback, useMemo } from "react";

import Form from "../components/Form";
import Table from "../components/Table";
import ChartCard from "../components/ChartCard";
import ChartLines from "../components/ChartLines";
import ChartPie from "../components/ChartPie";
import Head from "next/head";
import Header from "../components/Header";
import { useFormStore } from "../store/form";
import getAmortizationTable from "../shared/amortizationTable";

export default function Home() {
  const { months, capital, tae, startDate, vpaAmount, vpaInterval } =
    useFormStore((state) => state);

  const amortizationTable = useMemo(
    () =>
      getAmortizationTable({
        months,
        capital,
        tae,
        startDate,
        vpaInterval,
        vpaAmount,
      }),
    [months, capital, tae, startDate, vpaInterval, vpaAmount]
  );

  const worstAmortizationTable = useMemo(
    () =>
      getAmortizationTable({
        months,
        capital,
        tae: 6,
        startDate,
        vpaInterval,
        vpaAmount,
      }),
    [months, capital, startDate, vpaInterval, vpaAmount]
  );

  const bestAmortizationTable = useMemo(
    () =>
      getAmortizationTable({
        months,
        capital,
        tae: 1,
        startDate,
        vpaInterval,
        vpaAmount,
      }),
    [months, capital, startDate, vpaInterval, vpaAmount]
  );

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
      <Head>
        <title>RMORT - Understand your mortgage</title>
        <meta
          name="description"
          content="Understand how you money can fly away with a mortgage and how much relevant are the periodical amortizations"
        />
        <meta property="og:title" content="RMORT - Understand your mortgage" />
        <meta
          property="og:image"
          content="https://rmort.vercel.app/screenshot.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@emmgfx" />
      </Head>
      <div className="container mx-auto p-5 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Header />
          <Form />
        </div>
        <div className="h-16" />
        <div className="grid grid-cols-3 text-center gap-3">
          <div className="text-emerald-300 bg-indigo-900 rounded-lg p-10">
            Best scenario interests sumatory:{" "}
            <div className="font-semibold text-4xl">
              {new Intl.NumberFormat().format(bestScenarioTotalInterests)}
            </div>
          </div>
          <div className="text-rose-400 bg-indigo-900 rounded-lg p-10">
            Worst scenario interests sumatory:
            <div className="font-semibold text-4xl">
              {new Intl.NumberFormat().format(worstScenarioTotalInterests)}
            </div>
          </div>
          <div className="text-yellow-300 bg-indigo-900 rounded-lg p-10">
            Indicated scenario interests sumatory:{" "}
            <div className="font-semibold text-4xl">
              {new Intl.NumberFormat().format(regularScenarioTotalInterests)}
            </div>
          </div>
        </div>
        <div className="h-16" />
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
      </div>
    </>
  );
}
