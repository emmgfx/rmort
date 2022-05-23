export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

export const numberFormat = (num) => new Intl.NumberFormat({}).format(num);

export const monthsToYearsAndMonths = (months) => {
  const years = Math.floor(months / 12);
  const monthsLeft = months % 12;
  return monthsLeft === 0
    ? `${years} years`
    : `${years} years and ${monthsLeft} months`;
};
