import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongoosePaginate from 'mongoose-paginate-v2';

const petTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },

  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  icon: {
    icon: { type: String },
    color: { type: String }
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  autoIndex: true
});




petTypeSchema.plugin(mongooseAutoPopulate);
petTypeSchema.plugin(mongooseLeanVirtuals);
petTypeSchema.plugin(mongoosePaginate);

const PetsModel = mongoose.model('Pets', petTypeSchema);

export default PetsModel;

