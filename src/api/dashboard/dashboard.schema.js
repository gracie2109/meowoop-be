import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongoosePaginate from 'mongoose-paginate-v2';

const dashboardSchema = new mongoose.Schema({
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
  background: {
   type: String,
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  autoIndex: true
});

dashboardSchema.plugin(mongooseAutoPopulate);
dashboardSchema.plugin(mongooseLeanVirtuals);
dashboardSchema.plugin(mongoosePaginate);

const DashboardModel = mongoose.model('Dashboard', dashboardSchema);

export default DashboardModel;

