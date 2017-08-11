# graphqltest
GraphQL Lambda Function

## Getting started

Make sure you have [Node.js](http://nodejs.org/) and [Serverless Framework](http://serverless.com/) installed.

```sh
$ git clone git@github.com:jounile/graphqltest.git
$ cd graphqltest
$ npm install
```

Configure your AWS environment connection

```sh
$ sls config credentials --provider aws --key asfd --secret qwer
```

Deploy your services

```sh
$ sls deploy
```