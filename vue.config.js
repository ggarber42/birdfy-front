const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
  },
}
