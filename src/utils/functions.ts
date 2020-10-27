export const isEmpty = (obj: object | undefined): boolean => {
  return obj !== undefined ? Object.keys(obj).length === 0 && obj.constructor === Object : true;
};
