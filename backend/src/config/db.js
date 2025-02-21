const {connect, ModifiedPathsSnapshot} = require('mongoose')

const connectToDb = async(url) =>{
    try {
        await connect(url)
        console.log('Connected to database')
    } catch (error) {
        console.error('Error in Connecting to Database:', error)
        throw error
    }
}

module.exports = connectToDb