export const checkValidEmail = (email, tail) => {
  if (email.indexOf(tail, email.length - tail.length) !== -1) {
    return true;
  }
  return false;
};
