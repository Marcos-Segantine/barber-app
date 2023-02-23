export const formatPhoneNumber = text => {
  let cleaned = ('' + text).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  } else {
    return cleaned
      .substring(0, 11)
      .replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
  }
};
