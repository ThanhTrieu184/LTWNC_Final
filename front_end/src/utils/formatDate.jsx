import moment from "moment";
import "moment/locale/vi";

export const formatDateFromNow = (date) => {
  return moment(date, "DD/MM/YYYY-HH:mm:ss").locale("vi").fromNow();
};
