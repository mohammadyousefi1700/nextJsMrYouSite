export const ConvertDatePersian = (data: string) => {
  const dateFuncFormatYears = new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dateFuncFormatHours = new Intl.DateTimeFormat("fa", {
    minute: "2-digit",
    hour: "numeric",
  });

  return [
    dateFuncFormatHours.format(new Date(data)),
    " ",
    dateFuncFormatYears.format(new Date(data)),
  ];
};
