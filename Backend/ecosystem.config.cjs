module.exports = {
  apps: [
    {
      name: "Evently",
      script: "server.js",
      exec_mode: "cluster",
      instances: 5,
      wait_ready: true,
      out_file: "logs/out.log",
      error_log: "logs/err.log",
    },
  ],
};
