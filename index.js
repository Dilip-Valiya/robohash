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
