import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const AttendanceSummary = () => {
  const [summary, setSummary] = useState<any[]>([]);
  const [groupBy, setGroupBy] = useState<'day' | 'month'>('month');
  const [filters, setFilters] = useState({ from: '', to: '', student_type: '', class_id: '' });

  const fetchSummary = async () => {
    const res = await API.get('/attendance/summary', {
      params: { ...filters, group_by: groupBy },
    });

    // Convert from {date: [status1, status2]} → [{period, present, absent, permission}]
    const formatted = Object.entries(res.data).map(([period, list]: any) => {
      const row: any = { period };
      list.forEach((item: any) => {
        row[item.status] = item.total;
      });
      return row;
    });

    setSummary(formatted);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSummary();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Attendance Report Summary</h2>

      <form onSubmit={handleFilter} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          name="from"
          placeholder="From"
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="to"
          placeholder="To"
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          onChange={(e) => setGroupBy(e.target.value as any)}
          className="p-2 border rounded"
        >
          <option value="month">Group by Month</option>
          <option value="day">Group by Day</option>
        </select>
        <button
          type="submit"
          className="col-span-2 md:col-span-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </form>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={summary}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="present" stroke="#22c55e" />
          <Line type="monotone" dataKey="absent" stroke="#ef4444" />
          <Line type="monotone" dataKey="permission" stroke="#eab308" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceSummary;
