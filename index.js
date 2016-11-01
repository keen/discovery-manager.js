const request = require('superagent')
const definitions = require('./definitions')

const projectId = process.env['PROJECT_ID'] || 'YOUR_PROJECT_ID'
const masterKey = process.env['MASTER_KEY'] || 'YOUR_MASTER_KEY'
const discoRef = `https://api.keen.io/3.0/projects/${projectId}/discoveries`

// Run
createAll()

function createAll(api_key, done) {
  const keys = Object.keys(getDiscoDef())
  Object.keys(getDiscoDef()).forEach((key) => {
    console.log(`Create ${getDiscoRef(key)}`)
    findOne(key, api_key, (err, res) => {
      if (err && err.response && err.response.error.status === 404) {
        createOne(key, api_key, done)
      }
      else {
        console.log(`${key} already exists`)
      }
    })
  })
}

function createOne(ref, api_key, done) {
  request
    .put(getDiscoRef(ref))
    .send(getDiscoDef(ref))
    .set('Authorization', api_key)
    .set('Content-Type', 'application/json')
    .end(done)
}

function findOne(ref, api_key, done) {
  request
    .get(getDiscoRef(ref) + '?api_key=' + api_key)
    .send()
    .end(done)
}

function getDiscoRef(ref) {
  return `${discoRef}/${ref}`
}

function getDiscoDef(ref) {
  return typeof ref === 'string' ? definitions[ref] : definitions
}
