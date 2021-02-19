interface Attendance {
  _id: string;
  userId: string;
  date: Date;
  companyId: string;
  wasPresent: boolean;
  hours: number;
}

export interface WeekAttendanceModel {
  userId: string | null;
  date: Date;
  wasPresent: boolean | null;
  hours: number | null;
}

interface AttendanceUserModel {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
}

export interface AttendanceModel {
  _id: string;
  pricePerHour: number;
  companyId: string;
  attendance?: AttendanceModel;
  user: AttendanceUserModel;
}
