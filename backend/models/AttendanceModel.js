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
    morningNotes: {
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
    },
    clockOutTime: {
      type: String,
      default: ''
    },
    clockInTimestamp: {
      type: Date,
      default: null
    },
    clockOutTimestamp: {
      type: Date,
      default: null
    },
    totalHours: {
      type: Number, // e.g. 8.5, 4.2
      default: 0
    },
    shiftType: {
      type: String,
      enum: ['full_time', 'part_time'],
      default: 'full_time'
    },
    attendanceStage: {
      type: String,
      enum: ['not_started', 'clocked_in', 'clocked_out'],
      default: 'not_started'
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

