"use client";

import { useFormStore } from "../store/form";

export const ScenarioCards = ({ best, worst, regular }) => {
  const { tae, currentEuribor } = useFormStore((state) => state);

  return (
    <div className="grid grid-cols-3 text-center gap-3">
      <div className="text-emerald-300 bg-indigo-900 rounded-lg py-10 px-5">
        Best scenario interests:
        <div className="h-4" />
        <div className="font-semibold text-4xl">
          {new Intl.NumberFormat().format(best)}
        </div>
        <div className="h-4" />
        <div className="text-xs">Euribor can go down to zero</div>
      </div>
      <div className="text-yellow-300 bg-indigo-900 rounded-lg py-10 px-5">
        Current scenario interests:
        <div className="h-4" />
        <div className="font-semibold text-4xl">
          {new Intl.NumberFormat().format(regular)}
        </div>
        <div className="h-4" />
        <div className="text-xs">
          Using your current TAE {tae + currentEuribor} ({tae} +{" "}
          {currentEuribor})
        </div>
      </div>

      <div className="text-rose-400 bg-indigo-900 rounded-lg py-10 px-5">
        Worst scenario interests:
        <div className="h-4" />
        <div className="font-semibold text-4xl">
          {new Intl.NumberFormat().format(worst)}
        </div>
        <div className="h-4" />
        <div className="text-xs">
          Using the Euribor maximum historic (5.393)
        </div>
      </div>
    </div>
  );
};
