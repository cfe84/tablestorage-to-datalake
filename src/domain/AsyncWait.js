class AsyncWait {
  static Sleep(timeMs) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeMs);
    })
  }
}

module.exports = AsyncWait;