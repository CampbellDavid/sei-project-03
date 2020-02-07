const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000
const dbURI = process.env.MONGOD_DB || `mongodb://localhost/pub-quiz-sei-project-${env}`
const secret = process.env.SECRET || 'I think, therefore I am'

module.exports = { port, dbURI, secret }