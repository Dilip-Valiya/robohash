# Fetch image and save it 
I'm using Open API to fetch the robot image data https://robohash.org/

This project is about fetching the image and write it to file

```
function writeToFile(image, index) {
  return new Promise((resolve) => {
    const loc = "./";
    fs.writeFile(loc + "robot" + index + ".jpg", image.data, () =>
      resolve(true)
    );
  });
}

function fetchImage(text) {
  return axios.get(`https://robohash.org/${text}`, {
    responseType: "arraybuffer",
  });
}
```

Below is the complete code

```
const fs = require("fs");
const axios = require("axios");

function generateString() {
  return new Promise((resolve) => {
    const randomString = Math.random().toString(36).substring(7);
    resolve(randomString);
  });
}

function writeToFile(image, index) {
  return new Promise((resolve) => {
    const loc = "./";
    fs.writeFile(loc + "robot" + index + ".jpg", image.data, () =>
      resolve(true)
    );
  });
}

function fetchImage(text) {
  return axios.get(`https://robohash.org/${text}`, {
    responseType: "arraybuffer",
  });
}

async function fetchAndWrite(index = 0) {
  try {
    const text = await generateString();
    const imageData = await fetchImage(text);
    await writeToFile(imageData, index);
    console.log("File written", index);
  } catch (e) {
    console.error(e);
  }
}

// fetchAndWrite();

module.exports = {
  fetchAndWrite,
};
```

Below is the demonstaration of how we can reuse the same function to fetch multiple robot image at the same time

```
const { fetchAndWrite } = require(".");

const allImageOccur = (elem) => elem;

async function manyRobot(n) {
  const imageStatus = await Promise.all(
    new Array(n).fill(0).map((_, index) => fetchAndWrite(index))
  );
  return imageStatus.every(allImageOccur);
}

manyRobot(2);
```
