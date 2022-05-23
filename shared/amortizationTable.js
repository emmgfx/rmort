import { roundToTwo } from "./utils";

const getAmortizationTable = ({
  months = 0,
  capital = 0,
  startDate = new Date(),
  tae = 0,
  VPAAmount = 0,
  VPAInterval = 0,
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

    const isVPAConfigured = VPAAmount > 0 && VPAInterval > 0;

    if (!isVPAConfigured) continue;
    const currentMonthNeedsVPA = currentMonth % VPAInterval == 0;
    if (!currentMonthNeedsVPA) continue;
    const canDoVPA = currentMonthNeedsVPA && pendingCapital > VPAAmount;
    if (!canDoVPA) continue;

    pendingCapital -= VPAAmount;

    fees.push({
      type: "voluntary",
      month: currentMonth,
      year: Math.floor((currentMonth - 1) / 12),
      fee: parseFloat(VPAAmount),
      interests: 0,
      interestsSumatory: interestsSumatory,
      amortization: parseFloat(VPAAmount),
      pendingCapital: pendingCapital,
      date: new Date(currentDate),
    });
  }

  return fees;
};

export default getAmortizationTable;
