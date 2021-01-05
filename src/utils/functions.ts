import { EmployeeDataInterface, UserDataInterface } from 'types/modelsTypes';

export const isEmpty = (obj: object | undefined): boolean => {
  return obj !== undefined ? Object.keys(obj).length === 0 && obj.constructor === Object : true;
};

export const compareDates = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDay() === secondDate.getDay();
};

export const removeDuplicates = (allAppUsers: UserDataInterface[], employeeInCompany: EmployeeDataInterface[]): UserDataInterface[] => {
  const employeeIdArray = employeeInCompany.map((employee) => employee.userId._id);

  return allAppUsers.filter((user) => !employeeIdArray.includes(user._id));
};

export const extractNumberFromString = (text: string | number): number => {
  const matches = `${text}`.match(/(\d+)/);

  if (matches) {
    return parseInt(matches[0]);
  } else {
    return 0;
  }
};

export const roundTo2 = (value: number):number => Math.round((value + Number.EPSILON) * 100) / 100;
