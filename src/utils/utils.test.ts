import {isEmpty, compareDates, roundTo2} from 'utils/functions';

test('compare dates', () => {
  let firstDate = new Date('2020-10-10');
  let secondDate = new Date('2020-09-09');

  expect(compareDates(firstDate, secondDate)).toBeFalsy();

  firstDate = new Date();
  secondDate = new Date();

  expect(compareDates(firstDate, secondDate)).toBeTruthy();
})

test('is empty object', () => {
  const obj = {};

  expect(isEmpty(obj)).toBeTruthy();

  const person = {name: 'Michał'};
  expect(isEmpty(person)).toBeFalsy();
})

test('round values', () => {
  let value = 12.00023;

  expect(roundTo2(value)).toEqual(12.00);

  value = 11.9023;
  expect(roundTo2(value)).toEqual(11.9);
})
