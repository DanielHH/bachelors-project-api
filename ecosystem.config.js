module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'API',
      script: 'main.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'gitlab',
      host: 'localhost',
      ref: 'origin/dev',
      repo: 'git@gitlab.ida.liu.se:pum-ninjas/PUMApi.git',
      path: '/home/gitlab/app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
