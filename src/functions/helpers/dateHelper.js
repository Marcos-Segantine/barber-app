export const getDay = ({day}) => {
  return day ? day.slice(8) : null;
};

export const getHour = ({shedule}) => {
  return shedule || null;
};

export const getMonth = ({day}) => {
  const [year, month] = day.split('-');
  return month;
};

export const getProfessional = ({professional}) => {
  return professional || null;
};

export const getYear = ({day}) => {
  return day.slice(0, 4);
};

export const dateFormated = ({day}) => {
  if (!day) return;
  const [year, month, date] = day.split('-');
  return `${date}/${month}/${year}`;
};
