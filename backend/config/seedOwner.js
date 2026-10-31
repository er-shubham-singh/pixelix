import User from '../models/UserModel.js';
import Attendance from '../models/AttendanceModel.js';
import { getLocalDateString } from '../controllers/employeeController.js';

export async function ensureDefaultAccounts() {
  try {
    // Check if owner exists
    const ownerExists = await User.findOne({ role: 'owner' });
    if (!ownerExists) {
      const owner = await User.create({
        name: 'Pixelix Director',
        email: 'owner@pixelix.co.in',
        password: 'PixelixOwner@2026',
        role: 'owner',
        domain: 'Owner / Management',
        employeeId: 'PX-DIR-001',
        phone: '+91 98765 43210',
        status: 'active'
      });
      console.log('👑 Default Owner Account created: owner@pixelix.co.in / PixelixOwner@2026');
    }

    // Check if we have demo employees
    const empCount = await User.countDocuments({ role: 'employee' });
    if (empCount === 0) {
      const emp1 = await User.create({
        name: 'Aarav Sharma',
        email: 'aarav.dev@pixelix.co.in',
        password: 'Employee@2026',
        role: 'employee',
        domain: 'Full Stack Developer',
        employeeId: 'PX-EMP-1001',
        phone: '+91 98765 00001',
        status: 'active'
      });

      const emp2 = await User.create({
        name: 'Priya Verma',
        email: 'priya.lead@pixelix.co.in',
        password: 'Employee@2026',
        role: 'employee',
        domain: 'Telecaller',
        employeeId: 'PX-EMP-1002',
        phone: '+91 98765 00002',
        status: 'active'
      });

      const emp3 = await User.create({
        name: 'Rohan Mehta',
        email: 'rohan.social@pixelix.co.in',
        password: 'Employee@2026',
        role: 'employee',
        domain: 'Social Media Handling',
        employeeId: 'PX-EMP-1003',
        phone: '+91 98765 00003',
        status: 'active'
      });

      const todayStr = getLocalDateString();
      // Seed today's attendance for demo
      await Attendance.create({
        user: emp1._id,
        date: todayStr,
        workSummary: 'Implemented 3D Three.js interactive canvas and optimized React bundle.',
        status: 'present'
      });

      await Attendance.create({
        user: emp2._id,
        date: todayStr,
        workSummary: 'Conducted 35 client outreach calls and qualified 4 high-intent enterprise leads.',
        status: 'present'
      });

      console.log('👥 Initial seed employees and demo attendance logs initialized.');
    }
  } catch (err) {
    console.error('Account seeding notice:', err.message);
  }
}

