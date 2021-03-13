const getNowDate = () => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  return `${month}.${day}`;
};

export default getNowDate;
