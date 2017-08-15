'use strict';

const G = require('graphql')
 
const schema = G.GraphQLSchema({
  query: new G.GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
	  hello: {
		type: G.GraphQLString,
		// {"hello": "world"}
		resolve () {
			return 'world'
		}
	  } 
	}
    
  }
})

function runQuery (query, claims, variables) {
  return G.graphql(schema, query, {claims: claims}, null, variables)  
}

module.exports.handler = (event, context, callback) => {
  console.log('Received event', JSON.stringify(event));
  
  const userInfo = event.requestContext.authorizer.claims
  console.log('Event from user ${userInfo.name} with ID ${userInfo.sub}')
  
  const request = JSON.parse(event.body)
  console.log('Query: ' + request.query)
  console.log('Variables: ' + JSON.stringify(request.variables))
  
  return runQuery(request.query, userInfo, request.variables)
    .then(response => {
		console.log(response)
		const respified = {
			statusCode: 200,
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(response)
		}
		console.log('Built response')
		console.log(respified)
		return respified
	})
	.then(response => callback(null, response))
	.catch(err => callback(err))
}




 

 

 
