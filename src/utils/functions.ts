export const isEmpty = (obj: object | undefined): boolean => {
  return obj !== undefined ? Object.keys(obj).length === 0 && obj.constructor === Object : true;
};

export const compareDates = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDay() === secondDate.getDay();
};
