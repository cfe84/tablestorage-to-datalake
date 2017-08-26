const msRestAzure = require('ms-rest-azure');
const adlsManagement = require("azure-arm-datalake-store");

const cleanFileName = (filename) => filename.replace(/\:/g, "-");

class AsyncDataLakeStoreLoader {

  constructor(accountName, folder, clientId, domain, secret) {
    const credentials = new msRestAzure.ApplicationTokenCredentials(clientId, domain, secret);
    this.filesystemClient = new adlsManagement.DataLakeStoreFileSystemClient(credentials);
    this.accountName = accountName;
    this.folder = folder;
  };

  Load(entity) {
    return new Promise((resolve, reject) => {
      const fileName = `${this.folder}/${cleanFileName(entity.filename)}`;
      const options = {
        streamContents: new Buffer(entity.content)
      };
      this.filesystemClient.fileSystem.create(this.accountName, fileName, options, function (err, result, request, response) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = AsyncDataLakeStoreLoader;