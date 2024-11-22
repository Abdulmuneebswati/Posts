const config = require('./config');
const app = require('./app.js');
app.listen(500, () => {
  console.log(`server running on port: 500`);
});
