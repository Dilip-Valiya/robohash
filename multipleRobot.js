const { fetchAndWrite } = require(".");

const allImageOccur = (elem) => elem;

async function manyRobot(n) {
  const imageStatus = await Promise.all(
    new Array(n).fill(0).map((_, index) => fetchAndWrite(index))
  );
  return imageStatus.every(allImageOccur);
}

manyRobot(2);
