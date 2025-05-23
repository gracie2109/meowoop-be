import mongoose, { MongooseError } from 'mongoose'
import 'dotenv/config'
const connectMongoDB = async () => {
	try {
		mongoose.set('strictQuery', false)
		const isProductionEnv = process.env.NODE_ENV?.includes('production')
		 const databaseUri = isProductionEnv ? process.env.PRODUCTION_DB_URI : process.env.TEST_DB_URI;	
		  return await mongoose.connect(databaseUri);
	} catch (error) {
		console.log('[ERROR] ::: ', (error.message))
	}
}

export default connectMongoDB