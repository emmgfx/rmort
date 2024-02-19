import { Suspense } from "react";
import { Form } from "../components/Form";
import { Header } from "../components/Header";

import { Results } from "../components/Results";
import { SyncSearchParams } from "../components/SyncSearchParams";

export default async function Page() {
  const url = "https://euribor.p.rapidapi.com/all";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
    },
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
  };

  let currentEuribor = 0;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    currentEuribor = result["3months"];
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <Suspense>
        <SyncSearchParams />
      </Suspense>
      <div className="container mx-auto p-5 md:p-10">
        <div className="grid gird-cols-1 md:grid-cols-[25%_75%] gap-16">
          <div className="">
            <Header />
            <Form currentEuribor={currentEuribor} />
          </div>
          <div>
            <Results />
          </div>
        </div>
      </div>
    </>
  );
}
