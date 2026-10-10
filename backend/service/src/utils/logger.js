function logInfo(message, data = null) {
  if (data) {
    console.log(message, data);
    return;
  }

  console.log(message);
}

function logError(error, context = "App") {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${context}] ${message}`);

  if (error && error.stack) {
    console.error(error.stack);
  }
}

module.exports = { logInfo, logError };
