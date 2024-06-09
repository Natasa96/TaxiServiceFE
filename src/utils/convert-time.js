import moment from "moment-timezone";

export const convertUTCToLocal = (utcDateStr) => {
  const localDate = moment
    .utc(utcDateStr)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");

  return localDate;
};
