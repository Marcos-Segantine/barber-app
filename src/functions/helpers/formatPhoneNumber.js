export const formatPhoneNumber = text => {
  const cleaned = text.toString().replace(/\D/g, '');
  const groups = {
    0: cleaned.slice(0, 2),
    1: cleaned.slice(2, 7),
    2: cleaned.slice(7, 11),
  };

  if (text.length === 1) {
    return text;
  }

  if (cleaned.length === 2) {
    return `(${groups[0]})`;
  }

  if (cleaned.length <= 7) {
    return `(${groups[0]}) ${groups[1]}`;
  }

  return `(${groups[0]}) ${groups[1]}-${groups[2]}`;
};
