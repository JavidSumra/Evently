module.exports = {
  apps: [
    {
      script: "./server.js",
      instances: "-1",
      error_file: "./err.log",
      out_file: "./out.log",
    },
  ],
};
