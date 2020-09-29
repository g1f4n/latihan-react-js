import Parse from "parse";
import moment from "moment";

export const checkUser = () => {
  const user = Parse.User.current();

  if (user) {
    console.log("Ada user");
    console.log(user);
    return true;
  }

  return false;
};

export const getCurrentUser = () => {
  return Parse.User.current();
};

export const getUsername = () => {
  const user = Parse.User.current();
  console.log(user);

  if (user) {
    return user.get("fullname").split(" ")[0];
  }

  return false;
};

export const getLeaderId = () => {
  return Parse.User.current().id;
};

export const convertDate = (date, desiredFormat) => {
  return moment(date).format(desiredFormat);
};

export const handleSelect = (key) => {
  switch (key) {
    case 0:
      return "Rejected";
    case 1:
      return "Approved";
    case 3:
      return "Belum Terproses";
    case 4:
      return "DAILY";
    case 5:
      return "WEEKLY";
    case 6:
      return "MONTHLY";
    case 7:
      return "RANGE";
    default:
      break;
  }
};
