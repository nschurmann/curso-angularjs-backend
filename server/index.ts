// Set default node environment to development
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') { }

// Export the application
export default require('./app')
