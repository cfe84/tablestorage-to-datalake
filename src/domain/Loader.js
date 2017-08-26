class Loader {
  constructor(load) {
    this.load = load;
  }

  async Load(transformedEntity) {
    await this.load.Load(transformedEntity);
  }
}

module.exports = Loader;