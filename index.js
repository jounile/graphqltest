'use strict'
 
const graphql = require('graphql')
const lambdaGraphql = require('lambda-graphql')
 
const schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`)
 
const root = {
  hello: function(params) {
    return 'world'
  }
}
 
// options passed to lambdaGraphql() are the same as options for express-graphql module
let app = lambdaGraphql({
  schema: schema,
  rootValue: root
})
 
// pass handler as `index.handler` for aws lambda
exports.handler = app.handler
 
// shutdown gracefully (process in container is stopped before going to "sleep")
process.on('exit',() => {
  app.close()
})
process.on('SIGINT',process.exit)