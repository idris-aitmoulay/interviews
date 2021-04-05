module.exports = {
  apps: [
    {
      name: 'ws',
      script: 'app.js',
      // instances: 2,
      exec_mode: "cluster",
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
};
