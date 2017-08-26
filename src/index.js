require("dotenv").config();
const AsyncTableServiceQuery = require("./infrastructure/AsyncTableServiceQuery");
const AsyncFsLoader = require("./infrastructure/AsyncFsLoader");
const AsyncDataLakeStoreLoader = require("./infrastructure/AsyncDataLakeStoreLoader");
const EventToFsTransform = require("./middleware/EventToFSTransform");

const Extractor = require("./domain/Extractor");
const ETL = require("./domain/ETL");

const { tableServiceConfiguration, dataLakeStoreConfiguration } = require("./configuration");

const run = async () => {
  const querier = new AsyncTableServiceQuery(
    tableServiceConfiguration.connectionString,
    tableServiceConfiguration.tableName,
    tableServiceConfiguration.query,
    tableServiceConfiguration.fields);
  const extract = new Extractor(querier);
  const transform = new EventToFsTransform();

  const load = new AsyncDataLakeStoreLoader(
    dataLakeStoreConfiguration.accountName,
    dataLakeStoreConfiguration.folder,
    dataLakeStoreConfiguration.clientId,
    dataLakeStoreConfiguration.domain,
    dataLakeStoreConfiguration.secret);

  const etl = new ETL(extract, transform, load);
  etl.Run();
};
run();