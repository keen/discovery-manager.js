const request = require('superagent')
const definitions = require('./definitions')
const utils = require('./utils')

const projectId = process.env['PROJECT_ID'] || 'YOUR_PROJECT_ID'
const masterKey = process.env['MASTER_KEY'] || 'YOUR_MASTER_KEY'
const discoRef = utils.getDiscoRef(projectId)

// Run
destroyAll((err, res) => {
  console.log(err);
  console.log(res.body);
})

function destroyAll(done) {
  Object.keys(definitions).forEach((key) => {
    console.log(`Delete ${utils.getDiscoRef(projectId, key)}`)
    utils.findOne(projectId, key, masterKey, (err, res) => {
      if (err && err.response && err.response.error.status === 404) {
        console.log(`${key} does not exists`)
      }
      else {
        destroyOne(key, masterKey, done)
      }
    })
  })
}

function destroyOne(ref, api_key, done) {
  request
    .delete(utils.getDiscoRef(projectId, ref))
    .send()
    .set('Authorization', api_key)
    .set('Content-Type', 'application/json')
    .end(done)
}