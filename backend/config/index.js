const convict = require('convict');

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  signInJwtSecret: {
    doc: 'authentication',
    format: String,
    default: 'posts',
    env: 'JWT_AUTHENTICATION',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: '127.0.0.1',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'database_development',
    },
    username: {
      doc: 'db user',
      format: String,
      default: 'root',
    },
    password: {
      doc: 'db password',
      format: '*',
      default: null,
    },
  },
});

let env = config.get('env');

if (env) {
  config.loadFile(__dirname + '/environments/' + env + '.json');
}

config.validate({ allowed: 'strict' });

module.exports = config;
