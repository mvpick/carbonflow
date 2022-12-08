const express = require('express')
const cors = require('cors')
const app = express()
// const { sequelize } = require('./db/models/index.js')
// const { seed } = require('./util/seed')
// const { init_directory } = require('./util/init_directory')

//
// // SEQUELIZE 연결 체크
// sequelize.authenticate()
// .then(() => console.log('Connection has been established successfully.'))
// .catch(err => console.error('Unable to connect to the database: ', err))

// // { force: true }
// // { alter : true }
// sequelize.sync()
// .then(() => {
//     console.log('DB SYNC SUCCESS')
//     if (process.env.APP_ENVIRONMENT === 'dev') {
//         seed() // seed DB initialization
//     }
//     init_directory() // static directory initialization
// })
// .catch(err => console.log('DB SYNC FAIL: ', err))


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
app.use('/excelTest', require('./router/excelTest.js')) // free


module.exports = {
  path: '/api',
  handler: app
}
