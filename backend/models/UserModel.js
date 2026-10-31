import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false // not returned in queries unless explicitly requested
    },
    role: {
      type: String,
      enum: ['owner', 'employee'],
      default: 'employee'
    },
    domain: {
      type: String,
      required: [true, 'Please specify employee domain / department'],
      enum: [
        'Telecaller',
        'Full Stack Developer',
        'App Developer',
        'HR',
        'Social Media Handling',
        'Graphic Design',
        'Lead Generation',
        'UI/UX Designer',
        'Digital Marketing',
        'SEO Specialist',
        'Content Creator',
        'Project Manager',
        'E-Commerce Operations',
        'Listing & Cataloging',
        'Dispatch & Logistics',
        'Owner / Management',
        'Other'
      ],
      default: 'Full Stack Developer'
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave'],
      default: 'active'
    },
    joinedDate: {
      type: Date,
      default: Date.now
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

