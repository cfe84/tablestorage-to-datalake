fs = require("fs");
const path = require("path");

class AsyncFsLoader {
  constructor(directoryName) {
    this.directoryName = directoryName;
  }

  Load(entity) {
    const fileName = path.join(this.directoryName, entity.filename);

    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, entity.content, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  }
}

module.exports = AsyncFsLoader;