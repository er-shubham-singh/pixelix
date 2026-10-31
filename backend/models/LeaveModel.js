import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    startDate: {
      type: String, // 'YYYY-MM-DD'
      required: [true, 'Please provide start date']
    },
    endDate: {
      type: String, // 'YYYY-MM-DD'
      required: [true, 'Please provide end date']
    },
    reason: {
      type: String,
      required: [true, 'Please explain reason for leave request'],
      trim: true
    },
    type: {
      type: String,
      enum: ['casual', 'sick', 'emergency', 'vacation', 'other'],
      default: 'casual'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    reviewNotes: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;

