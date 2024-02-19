"use client";

import { useEffect } from "react";
import { useMountEffect } from "@react-hookz/web";
import { useRouter, useSearchParams } from "next/navigation";

import { useFormStore } from "../store/form";

export const SyncSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    setCurrentEuribor,
  } = useFormStore((state) => state);

  // Copy searchParams into store
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

  // When store changes, update searchParams
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
};
