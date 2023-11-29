const fs = require("fs");
const path = require("path");

const fsProblem2 = (filePath) => {
  const unlinkPromise = (path) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  const readFilePromise = (path, type) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, type, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  const wrtieFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  const appendFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(path, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  readFilePromise(filePath, "utf-8")
    .then((data) => {
      data = data.toUpperCase();
      return wrtieFilePromise("./uppercaseFile.txt", data);
    })
    .then(() => {
      return appendFilePromise("./filenames.txt", "uppercaseFile.txt");
    })
    .then(() => {
      return readFilePromise("./uppercaseFile.txt", "utf-8");
    })
    .then((data) => {
      data = data
        .toLowerCase()
        .split("\n")
        .filter((ele) => ele !== "")
        .join()
        .split(".")
        .join("\n");
      return wrtieFilePromise("./lowerSentenceFile.txt", data);
    })
    .then(() => {
      return appendFilePromise("./filenames.txt", "\nlowerSentenceFile.txt");
    })
    .then(() => {
      return readFilePromise("./lowerSentenceFile.txt", "utf-8");
    })
    .then((data) => {
      data = data.split("\n").join(".").split(" ").sort().join(" ");
      return wrtieFilePromise("./sortedFilePromise.txt", data);
    })
    .then(() => {
      return appendFilePromise("./filenames.txt", "\nsortedFilePromise.txt");
    })
    .then(() => {
      return readFilePromise("./filenames.txt", "utf-8");
    })
    .then((data) => {
      files = data.split("\n");
      for (let file of files) {
        unlinkPromise(file);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports.fsProblem2 = fsProblem2;