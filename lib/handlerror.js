const handleError = err => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = handleError;
