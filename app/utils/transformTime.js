const transformTime = (duration) => {
  const secNum = parseInt(duration, 10);
  const hours = Math.floor(secNum / 3600) % 24;
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;
  return [hours, minutes, seconds]
    .map(v => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

export default transformTime;
