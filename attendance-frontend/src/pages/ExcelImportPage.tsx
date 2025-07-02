import React, { useState } from 'react';
import API from '../api/axios';

const ExcelImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<'young' | 'elder'>('young');
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('❌ Please select an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      await API.post('/students/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Upload successful!');
    } catch (err) {
      setMessage('❌ Upload failed. Check your file format.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📥 Import Students Excel File</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value as 'young' | 'elder')}
        >
          <option value="young">Young Students</option>
          <option value="elder">Elder Students</option>
        </select>

        <input
          type="file"
          accept=".xlsx, .xls"
          className="w-full p-2 border rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};

export default ExcelImportPage;
