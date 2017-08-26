AsyncWait = require("./AsyncWait");

const pumpCount = 30;
const queueRefillThreshold = 200;

class ETL {
  constructor(extract, transform, load) {
    this.extract = extract;
    this.transform = transform;
    this.load = load;
    this.queue = [];
    this.done = false;
    this.count = 0;
    this.start = Date.now();
  }

  async _startFillingQueue() {
    while (!this.done) {
      const queueNeedsRefill = this.queue.length < queueRefillThreshold;
      if (queueNeedsRefill) {
        const entry = await this.extract.Next();
        if (entry.done && this.queue.length === 0) {
          this.done = true;
          break;
        }
        if (!entry.done) {
          this.queue.push(entry.value);
        }
      } else {
        await AsyncWait.Sleep(100);
      }
    }
  }

  _displayConsole() {
    const durationMillisecond = Date.now() - this.start;
    const processedPerSecond = this.count / durationMillisecond * 1000;
    console.log(`${this.count} - ${Math.round(processedPerSecond * 100) / 100} messages / second`);
  }

  async _processEntity(entity) {
    this.count++;
    this._displayConsole();
    const transformedEntity = this.transform.Transform(entity);
    await this.load.Load(transformedEntity);
  }

  async _startTransformLoadPump() {
    while(!this.done) {
      const entity = this.queue.pop();
      if (entity !== undefined) {
        await this._processEntity(entity);
      } else {
        await AsyncWait.Sleep(100);
      }
    }
  }

  async Run() {
    this._startFillingQueue();
    for (let i = 0; i < pumpCount; i++) {
      this._startTransformLoadPump()
    }
  }
}

module.exports = ETL;