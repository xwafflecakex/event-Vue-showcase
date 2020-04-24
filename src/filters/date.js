// global filter for the dates.
export default value => {
  // take the date value and format it to a date to work with
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
};
