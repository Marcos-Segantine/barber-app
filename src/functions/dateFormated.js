export const dateFormated = shedulesUser => {
  return shedulesUser.day.split('-').reverse().join('/');
};
