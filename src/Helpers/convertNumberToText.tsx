export const convertNumberToText = (number: any) => {
  const units = ["", "Thousand", "Million", "Billion", "Trillion"];
  const base = 1000;

  if (number < base) {
    return number.toString();
  }

  const magnitude = Math.floor(Math.log10(number) / 3);
  const adjustedNumber = Math.floor(number / Math.pow(base, magnitude));
  const unit = units[magnitude];

  return `${adjustedNumber} ${unit} Naira`;
};
