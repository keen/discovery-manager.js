const request = require('superagent')

let utils = {

  getDiscoBase (projectId) {
    return `https://api.keen.io/3.0/projects/${projectId}/discoveries`
  },

  getDiscoRef (projectId, ref) {
    return `${utils.getDiscoBase(projectId)}/${ref}`
  },

  getDiscoDef (definitions, ref) {
    return typeof ref === 'string' ? definitions[ref] : definitions
  },

  findOne(projectId, ref, api_key, done) {
    request
      .get(utils.getDiscoRef(projectId, ref) + '?api_key=' + api_key)
      .send()
      .end(done)
  }

}

module.exports = utils