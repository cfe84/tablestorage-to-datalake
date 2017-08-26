const tableServiceConfiguration = {
  connectionString: process.env.TABLE_SERVICE_CONNECTION_STRING,
  tableName: process.env.TABLE_SERVICE_TABLE_NAME,
  query: process.env.TABLE_SERVICE_QUERY,
  fields: ["RowKey", "body"]
};

const dataLakeStoreConfiguration = {
  accountName: process.env.DATA_LAKE_STORE_ACCOUNT_NAME,
  folder: process.env.DATA_LAKE_STORE_FOLDER,
  clientId: process.env.DATA_LAKE_STORE_CLIENT_ID,
  domain: process.env.DATA_LAKE_STORE_DOMAIN,
  secret: process.env.DATA_LAKE_STORE_SECRET
};

module.exports = {
  tableServiceConfiguration: tableServiceConfiguration,
  dataLakeStoreConfiguration: dataLakeStoreConfiguration
};