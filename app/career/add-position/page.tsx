'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPositionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to add job');

      alert('Job position added successfully!');
      router.push('/'); // or wherever you want to redirect
    } catch (err) {
      alert('Error adding job position');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Add New Job Position</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 dark:text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border px-4 py-2 rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#7AA859] text-white px-6 py-2 rounded hover:bg-[#6b954b] transition"
        >
          {loading ? 'Saving...' : 'Add Position'}
        </button>
      </form>
    </div>
  );
}
