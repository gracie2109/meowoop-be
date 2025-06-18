import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_SECRET,
});

cloudinary.api.ping()
  .then(() => console.log('Cloudinary connected successfully'))
  .catch(err => console.error('Cloudinary connection failed:', err));

export default cloudinary
