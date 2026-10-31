import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: String, // 'YYYY-MM-DD' format for accurate date comparisons
      required: true,
      index: true
    },
    workSummary: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['present', 'leave', 'half_day', 'holiday'],
      default: 'present'
    },
    leaveRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Leave',
      default: null
    },
    clockInTime: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  },
  {
    timestamps: true
  }
);

// One attendance record per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;

