'use client'
import Image from 'next/image';
import { justlogo, logo } from '../../public/img';
import { useState, ChangeEvent, FormEvent } from 'react';

// Define types for the form data
interface FormData {
  student_id: string;
}

// Define types for the API response data
interface ResultData {
  program_name: string;
  study_center_name: string;
  student_id: string;
  name_en: string;
  fathers_name_en: string;
  mothers_name_en: string;
  batch: string;
  passing_year: string;
  result: string;
  message: string
}

export default function Home() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    student_id: '',
  });

  // State to store the API response data
  const [result, setResult] = useState<ResultData | null>(null);

  // State to manage loading state
  const [loading, setLoading] = useState<boolean>(false);

  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://result.bou.ac.bd/api/get-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      const data = await response.json(); // Parse the response JSON

      if (response.ok) {
        // If the request was successful, set the result data
        setResult(data.data);
      } else {
        // If the response was not okay, set the error
        setError(data.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      // Handle network errors or other errors
      if (error instanceof Error) {
        // If the error is a known instance of Error, handle it
        setError({ message: error.message });
      } else {
        setError({ message: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <div className="dark:bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white/75 backdrop-blur-sm">
        <nav>
          <div className="flex h-16 items-center justify-center">
            <div className="flex items-center">
              <Image src={justlogo} width={55} height={55} alt="logo" className="mt-2 mr-2" />
              <Image src={logo} alt="logo" width={350} height={50} />
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto h-screen justify-center dark:bg-white/75">
        <div className="mb-8 overflow-hidden" data-v-2fd469dd="">
          <div className="bg-cyan-50 border-cyan-200 rounded-lg shadow-sm" data-v-2fd469dd="">
            <div className="py-2 px-4" data-v-2fd469dd="">
              <div className="flex items-center" data-v-2fd469dd="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bell-icon h-5 w-5 text-cyan-500 mr-2 flex-shrink-0"
                  data-v-2fd469dd=""
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <div className="overflow-hidden flex-grow" data-v-2fd469dd="">
                  <div className="animate-marquee-horizontal whitespace-nowrap" data-v-2fd469dd="">
                    <span className="inline-flex items-center mx-4 text-gray-700" data-v-2fd469dd="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-megaphone-icon h-4 w-4 mr-1"
                        data-v-2fd469dd=""
                      >
                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                      </svg>
                      BOU exam result site is up!!!
                    </span>
                    <span className="inline-flex items-center mx-4 text-gray-700" data-v-2fd469dd="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-megaphone-icon h-4 w-4 mr-1"
                        data-v-2fd469dd=""
                      >
                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                      </svg>
                      HSC exam-2024 result has been published!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Search Your Result</h2>
            <p className="text-sm text-gray-600">Enter your Student ID to view your results</p>

            {/* Form handle */}
            <div>
              <form className="max-w-md mx-auto mb-8" onSubmit={handleSubmit}>
                <div className="mt-4 relative ">
                  <input
                    type="text"
                    placeholder="Enter student ID without (-) hyphen"
                    className="w-full py-2 px-4 border border-gray-300 dark:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-md"
                    id="student_id"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 bottom-0 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded-r-md"
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500">Error: {error}</p>}

              {/* Show Data */}
              <div className="shadow rounded-lg text-gray-600">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                  {result && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Program:</dt>
                        <dd>{result.program_name}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Study Center:</dt>
                        <dd>{result.study_center_name}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Student ID:</dt>
                        <dd>{result.student_id}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Student Name:</dt>
                        <dd>{result.name_en}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Fathers Name:</dt>
                        <dd>{result.fathers_name_en}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Mothers Name:</dt>
                        <dd>{result.mothers_name_en}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Batch:</dt>
                        <dd>{result.batch}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">Passing Year:</dt>
                        <dd>{result.passing_year}</dd>
                      </div>
                      <div className="flex justify-between sm:col-span-1">
                        <dt className="font-semibold">GPA:</dt>
                        <dd>{result.result}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
