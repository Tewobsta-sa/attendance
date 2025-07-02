import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const StudentDashboard = () => {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({ present: 0, absent: 0, permission: 0 });

  const fetchAttendance = async () => {
    try {
      const res = await API.get('/attendance/my');
      setRecords(res.data.records);

      const count = { present: 0, absent: 0, permission: 0 };
      res.data.records.forEach((rec: any) => {
        count[rec.status]++;
      });
      setSummary(count);
    } catch (err) {
      console.error('Failed to fetch student attendance');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎓 My Attendance</h2>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Present</p>
          <p className="text-2xl font-bold text-green-600">{summary.present}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Absent</p>
          <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Permission</p>
          <p className="text-2xl font-bold text-yellow-600">{summary.permission}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec: any) => (
              <tr key={rec.id}>
                <td className="p-2 border">{new Date(rec.created_at).toLocaleDateString()}</td>
                <td className="p-2 border">{rec.class?.class_name || '-'}</td>
                <td className={`p-2 border capitalize font-medium text-${rec.status === 'present' ? 'green' : rec.status === 'absent' ? 'red' : 'yellow'}-600`}>
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && <p className="text-center py-4">No attendance records found.</p>}
      </div>
    </div>
  );
};

export default StudentDashboard;
