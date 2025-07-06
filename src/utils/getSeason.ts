export const getSeason = () => {
  const month = new Date().getMonth() + 1;
  return month >= 3 && month <= 11 ? "summer" : "winter";
};
