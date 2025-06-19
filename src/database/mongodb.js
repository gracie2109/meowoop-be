import mongoose  from 'mongoose';
import AppConfig from "../configs/app.config"
import 'dotenv/config'
const connectMongoDB = async () => {
	try {
		mongoose.set('strictQuery', false)
		const isProductionEnv = AppConfig.isProductionMode
		 const databaseUri = isProductionEnv ? process.env.PRODUCTION_DB_URI : process.env.TEST_DB_URI;	
		  return await mongoose.connect(databaseUri);
	} catch (error) {
		console.log('[ERROR] ::: ', (error.message))
	}
}

export default connectMongoDB