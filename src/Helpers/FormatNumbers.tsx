export const formatNumber = (number: number) => {
  const absNumber = Math.abs(number);
  if (absNumber >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (absNumber >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
