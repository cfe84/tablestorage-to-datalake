class EventToFSTransform {
  Transform(event) {
    return {
      filename: `${event.RowKey._}.json`,
      content: event.body._
    }
  }
}

module.exports = EventToFSTransform;