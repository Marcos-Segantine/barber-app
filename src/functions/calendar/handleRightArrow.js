export const handleRightArrow = (month, setMonth, setYear) => {
    if (month === 10) setMonth('10');
    else if (month === 11) setMonth('11');
    else if (month === 12) setMonth('12');
    else {
      let monthTemp = month;
      monthTemp = +monthTemp.split('').splice(1, 1).join('');

      setMonth(`0${monthTemp + 1}`);
    }
    setYear(new Date().getFullYear());
}