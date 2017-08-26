class Extractor {
  constructor(query) {
    this.query = query;
    this.done = false;
    this.currentSet = [];
  }

  async _refillCurrentSetIfNecessary() {
    if (this.currentSet.length === 0) {
      const queryResult = await this.query.ContinueQueryExecution();
      if (queryResult.done) {
        this.done = true;
      }
      else {
        this.currentSet = queryResult.value;
      }
    }
  }

  async Next() {
    await this._refillCurrentSetIfNecessary();
    if (this.done) {
      return {
        done: true,
        value: null
      }
    }
    return this.currentSet.pop();
  }
}

module.exports = Extractor;