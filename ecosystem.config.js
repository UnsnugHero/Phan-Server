module.exports = {
  apps: [
    {
      name: 'phan-server',
      script: './src/app.js'
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-201-94-2.compute-1.amazonaws.com',
      key: '~/.ssh/phan-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:UnsnugHero/Phan-Server.git',
      path: '/home/ubuntu/phan-server',
      'pre-setup': 'rm -rf phan-server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
