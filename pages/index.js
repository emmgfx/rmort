import { useState } from "react";

import Form from "../components/Form";
import Table from "../components/Table";
import ChartCard from "../components/ChartCard";
import ChartLines from "../components/ChartLines";
import ChartPie from "../components/ChartPie";
import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  const [values, setValues] = useState([]);

  return (
    <>
      <Head>
        <title>RMORT - Understand your mortgage</title>
      </Head>
      <div className="container mx-auto p-10">
        <Header />
        <div className="h-8" />
        <Form onValuesUpdated={(values) => setValues(values)} />
        <div className="h-8" />

        {values.length > 0 && (
          <>
            <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[2fr_1fr] gap-4">
              <ChartCard>
                <ChartLines values={values} />
              </ChartCard>
              <ChartCard>
                <ChartPie values={values} />
              </ChartCard>
            </div>
            <div className="h-8" />

            <Table values={values} />
          </>
        )}
      </div>
    </>
  );
}
