import React, { useEffect, useState } from 'react';
import API from '../api/axios';

interface Attendance {
  id: number;
  student_id: number;
  student_type: string;
  status: string;
  created_at: string;
  class: {
    id: number;
    class_name: string;
  };
}

const AttendanceList = () => {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [filters, setFilters] = useState({
    class_id: '',
    student_type: '',
    status: '',
    from: '',
    to: ''
  });

  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await API.get('/attendance', { params: filters });
      setRecords(res.data.data); // assuming pagination
    } catch (err) {
      console.error('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAttendance();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Attendance Records</h2>

      <form onSubmit={handleFilter} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <select name="class_id" onChange={handleChange} className="p-2 border rounded">
          <option value="">All Classes</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          {/* TODO: fetch classes dynamically */}
        </select>

        <select name="student_type" onChange={handleChange} className="p-2 border rounded">
          <option value="">All Types</option>
          <option value="young">Young</option>
          <option value="elder">Elder</option>
        </select>

        <select name="status" onChange={handleChange} className="p-2 border rounded">
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="permission">Permission</option>
        </select>

        <input type="date" name="from" onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="to" onChange={handleChange} className="p-2 border rounded" />

        <button
          type="submit"
          className="col-span-2 md:col-span-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Student ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="p-2 border">{record.id}</td>
                  <td className="p-2 border">{record.student_id}</td>
                  <td className="p-2 border">{record.student_type}</td>
                  <td className="p-2 border capitalize">{record.status}</td>
                  <td className="p-2 border">{record.class?.class_name}</td>
                  <td className="p-2 border">{new Date(record.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && <p className="text-center py-4">No records found.</p>}
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
