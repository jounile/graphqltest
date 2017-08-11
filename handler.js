'use strict';

const graphql = require('graphql')
const lambdaGraphql = require('lambda-graphql')
 
const schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: function(params) {
	console.log(JSON.stringify(event));
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


// Default sls template

//module.exports.hello = (event, context, callback) => {
//  const response = {
//    statusCode: 200,
//    body: JSON.stringify({
//      message: 'Go Serverless v1.0! Your function executed successfully!',
//      input: event,
//    }),
//  };
//
//  callback(null, response);
//
//  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
//};




 

 

 
