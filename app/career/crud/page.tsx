'use client';
import Layout from '@/app/components/Layout';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface Job {
  _id: string;
  title: string;
  location: string;
  description: string;
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      fetchJobs();
    }
  };
useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/login");
        }
    }, [router]);
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Positions</h1>
          <Link
            href="/career/crud/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Job
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="mt-2 text-gray-700">{job.description}</p>
                <div className="mt-4 space-x-3">
                  <Link
                    href={`/career/crud/edit/${job._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}