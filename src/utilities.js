export const collectIdsAndDocs = (doc) => {
  return { id: doc.id, ...doc.data() };
};

export const createWeek = () => {
  const todaydate = new Date();
  // find the year of the current date
  const oneJan = new Date(todaydate.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  const numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  return `${Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7)}`;
};
