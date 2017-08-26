require("dotenv").config();
const AsyncTableServiceQuery = require("./infrastructure/AsyncTableServiceQuery");
const AsyncFsLoader = require("./infrastructure/AsyncFsLoader");
const EventToFsTransform = require("./middleware/EventToFSTransform");

const Extractor = require("./domain/Extractor");
const Loader = require("./domain/Loader");
const ETL = require("./domain/ETL");

const tableServiceConnectionString = process.env.TABLE_SERVICE_CONNECTION_STRING;
const query = process.env.TABLE_SERVICE_QUERY;
const tableServiceTableName = process.env.TABLE_SERVICE_TABLE_NAME;
const fields = ["RowKey", "body"];

const querier = new AsyncTableServiceQuery(tableServiceConnectionString, tableServiceTableName, query, fields);
const extract = new Extractor(querier);
const transform = new EventToFsTransform();
const load = new AsyncFsLoader("./data");

const etl = new ETL(extract, transform, load);
etl.Run();