import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AttendanceScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [status, setStatus] = useState<'present' | 'absent' | 'permission'>('present');
  const [feedback, setFeedback] = useState('');
  const { user } = useAuth();

  const handleScan = async (data: string | null) => {
    if (data && data !== scanResult) {
      try {
        const parsed = JSON.parse(data);

        const allowedType =
          user?.role === 'attendance_recorder_young' ? 'young' :
          user?.role === 'attendance_recorder_elder' ? 'elder' : '';

        if (parsed.type !== allowedType) {
          setFeedback('⚠️ Not authorized to scan this student type.');
          return;
        }

        await API.post('/attendance/register', {
          student_id: parsed.id,
          student_type: parsed.type,
          class_id: 1, // TODO: Make this dynamic later
          status: status,
        });

        setScanResult(data);
        setFeedback('✅ Attendance recorded successfully.');
      } catch (err: any) {
        setFeedback('❌ Invalid QR or already marked.');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">📷 QR Code Attendance Scanner</h2>

      <div className="flex justify-center gap-4 mb-4">
        {['present', 'absent', 'permission'].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s as any)}
            className={`px-4 py-2 rounded font-semibold transition ${
              status === s
                ? s === 'present'
                  ? 'bg-green-600 text-white'
                  : s === 'absent'
                  ? 'bg-red-600 text-white'
                  : 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="rounded overflow-hidden border-2">
        <QrReader
          onResult={(result, error) => {
            if (result?.getText()) {
              handleScan(result.getText());
            }
          }}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ width: '100%' }}
        />
      </div>

      {feedback && (
        <div className="mt-4 p-3 rounded text-white font-medium text-center shadow
          ${
            feedback.startsWith('✅') ? 'bg-green-600' :
            feedback.startsWith('⚠️') ? 'bg-yellow-500' :
            'bg-red-600'
          }"
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;
