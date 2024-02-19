import { roundToTwo } from "./utils";

export const getAmortizationTable = ({
  months = 0,
  capital = 0,
  startDate = new Date(),
  tae = 0,
  vpaAmount = 0,
  vpaInterval = 0,
}) => {
  const fees = [];

  let interestsSumatory = 0;
  let pendingCapital = capital;
  let currentMonth = 0;
  let currentDate = new Date(startDate);

  while (roundToTwo(pendingCapital) > 0 && currentMonth <= months) {
    let fee = roundToTwo(
      (pendingCapital * (tae / 12)) /
        (100 * (1 - Math.pow(1 + tae / 12 / 100, currentMonth - months)))
    );
    let interests = roundToTwo((pendingCapital * (tae / 12)) / 100);
    let amortization = fee - interests;
    currentMonth++;
    currentDate.setMonth(currentDate.getMonth() + 1);

    interestsSumatory += interests;
    pendingCapital -= amortization;

    fees.push({
      type: "mandatory",
      month: currentMonth,
      year: Math.floor((currentMonth - 1) / 12),
      fee: fee,
      interests: interests,
      interestsSumatory: interestsSumatory,
      amortization: amortization,
      pendingCapital: pendingCapital,
      date: new Date(currentDate),
    });

    const isVpaConfigured = vpaAmount > 0 && vpaInterval > 0;

    if (!isVpaConfigured) continue;
    const currentMonthNeedsVpa = currentMonth % vpaInterval == 0;
    if (!currentMonthNeedsVpa) continue;
    const canDoVpa = currentMonthNeedsVpa && pendingCapital > vpaAmount;
    if (!canDoVpa) continue;

    pendingCapital -= vpaAmount;

    fees.push({
      type: "voluntary",
      month: currentMonth,
      year: Math.floor((currentMonth - 1) / 12),
      fee: parseFloat(vpaAmount),
      interests: 0,
      interestsSumatory: interestsSumatory,
      amortization: parseFloat(vpaAmount),
      pendingCapital: pendingCapital,
      date: new Date(currentDate),
    });
  }

  return fees;
};
