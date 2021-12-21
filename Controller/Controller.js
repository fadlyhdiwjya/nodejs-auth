exports.index = (req, res) => {
  if (!req) {
    res.json({
      error: true,
      message: "Error, Request not found",
    });
  } else {
    res.json({
      error: false,
      message: "Hello World",
    });
  }
};
