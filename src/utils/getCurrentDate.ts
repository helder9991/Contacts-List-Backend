function addLeftZero(num: number) {
  if (num < 10) return `0${num}`;

  return num;
}

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = addLeftZero(date.getDate());

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let formatedDate = `${day}/${month}/${year}`;

  formatedDate = `${formatedDate} ${addLeftZero(hours)}:${addLeftZero(minutes)}:${addLeftZero(seconds)}`;

  return formatedDate;
}

getCurrentDate(); // ?
export {
  getCurrentDate,
};
