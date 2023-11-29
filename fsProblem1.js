const fs = require("fs");
const path = require("path");

const fsProblem1 = (absolutePathOfRandomDirectory, randomNumberOfFiles) => {
  const readDirPromise = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  };

  const mkDirPromise = (path) => {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  const unlinkPromise = (path) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) reject(err);
        else resolve();
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

  const accessPromise = (path) => {
    return new Promise((resolve, reject) => {
      fs.access(path, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  accessPromise(absolutePathOfRandomDirectory)
    .then(() => {
      return accessPromise(absolutePathOfRandomDirectory);
    })
    .catch(() => {
      return mkDirPromise(absolutePathOfRandomDirectory);
    })
    .then(() => {
      const data = { name: "mahir", age: 21 };
      for (let i = 0; i < randomNumberOfFiles; i++) {
        fileName = `file_${i}.json`;
        wrtieFilePromise(
          path.join(absolutePathOfRandomDirectory, fileName),
          JSON.stringify(data)
        );
      }
    })
    .then(() => {
      return readDirPromise(absolutePathOfRandomDirectory);
    })
    .then((files) => {
      for (let file of files) {
        unlinkPromise(path.join(absolutePathOfRandomDirectory, file));
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports.fsProblem1 = fsProblem1;
