module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
