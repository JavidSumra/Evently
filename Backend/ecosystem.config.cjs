module.exports = {
  apps: [
    {
      name: "Evently",
      script: "server.js",
      instances: 5,
      wait_ready: true,
      exec_mode: "cluster",
    },
  ],
};
