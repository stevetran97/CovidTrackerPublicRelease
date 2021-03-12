let mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

// Connect to 'mongodb://mongo:27017/covid-tracker'
const server = 'mongo:27017'
const database = 'covid-tracker'

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(
      `mongodb://${server}/${database}`
    )
      .then(() => { console.log('Database connection established') })
      .catch(() => { console.log('Database connection ERROR') })
  }
}

module.exports = new Database()