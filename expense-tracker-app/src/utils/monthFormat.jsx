import moment from "moment";

const monthFormat = (date) => {
  return moment(date).format("MM/YYYY");
};

export default monthFormat;
