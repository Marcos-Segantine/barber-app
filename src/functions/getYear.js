export const getYear = shedulesUser => {
  console.log('GET YEAR FUNC', shedulesUser);
  return shedulesUser.day.slice(0, 4);
};
