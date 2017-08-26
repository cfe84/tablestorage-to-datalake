class ETL {
  constructor(extract, transform, load) {
    this.extract = extract;
    this.transform = transform;
    this.load = load;
  }

  async Run() {
    let entry;
    try {
      while (!(entry = await this.extract.Next()).done) {
        const transformedEntity = this.transform.Transform(entry);
        await this.load.Load(transformedEntity);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = ETL;