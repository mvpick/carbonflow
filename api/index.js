const express = require('express')
const cors = require('cors')
const app = express()
const { sequelize } = require('./db//models/index.js')
const { seed } = require('./utils/seed')

// --------------------------- 시퀄라이즈 -------------------------//
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database: ', err))

// { force: true }
// { alter : true }
sequelize.sync()
.then(() => {
    console.log('DB SYNC SUCCESS')
    if (process.env.APP_ENVIRONMENT === 'development') {
        seed() // seed DB initialization
    }
})
.catch(err => console.log('DB SYNC FAIL: ', err))
// --------------------------- 시퀄라이즈 -------------------------//

app.use(cors())

app.use(express.urlencoded({
  limit: '300mb',
  parameterLimit: 100000,
  extended: true
}))

app.use(express.json({ // json parser
  limit: '300mb'
}))

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Ogigin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

// all router
app.use('/excelUpload', require('./router/excelUpload.js')) // free
app.use('/allData', require('./router/allData.js')) // free


module.exports = {
  path: '/api',
  handler: app
}
