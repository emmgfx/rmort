import { useState, useCallback } from "react";

import Form from "../components/Form";
import Table from "../components/Table";
import ChartCard from "../components/ChartCard";
import ChartLines from "../components/ChartLines";
import ChartPie from "../components/ChartPie";
import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  const [amortizationTable, setAmortizationTable] = useState([]);

  const onNewAmortizationTable = useCallback(
    (values) => setAmortizationTable(values),
    [setAmortizationTable]
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
          <Form onNewAmortizationTable={onNewAmortizationTable} />
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
