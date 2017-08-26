const azure = require("azure-storage");

class AsyncTableServiceQuery {
  constructor(connectionString, tableName, query, fields) {
    this.tableService = azure.createTableService(connectionString);
    this.query = new azure.TableQuery()
      .select(fields)
      .where(query);
    this.tableName = tableName;
    this.continuationToken = null;
    this.done = false;
    this.count = 0;
  }

  ContinueQueryExecution() {
    if (this.done) {
      return Promise.resolve({
        done: true,
        value: null
      })
    }

    return new Promise((resolve, reject) => {
      this.tableService.queryEntities(this.tableName, this.query, this.continuationToken, (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res && res.continuationToken && res.continuationToken.nextPartitionKey) {
          this.continuationToken = res.continuationToken;
        }
        else {
          this.done = true;
        }
        this.count += res.entries.length;
        console.log(this.count);
        return resolve({
          done: false,
          value: res.entries
        });
      });
    });
  }
}

module.exports = AsyncTableServiceQuery;