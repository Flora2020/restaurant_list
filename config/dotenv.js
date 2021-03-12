module.exports = {
  envLoader: () => {
    const env = process.env.NODE_ENV
    switch (env) {
      case 'production':
        break
      default:
        require('dotenv').config()
    }
  }
}