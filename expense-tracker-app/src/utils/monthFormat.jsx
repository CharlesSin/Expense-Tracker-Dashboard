import moment from "moment";

export const monthFormat = (date) => {
  return moment(date).format("MM/YYYY");
};
