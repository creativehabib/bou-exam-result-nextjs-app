'use client'
import Image from 'next/image';
import Link from "next/link"
import { justlogo, logo } from '../../public/img';
import { toast } from "react-toastify"
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
  academic_year: number;
}

interface ErrorState{
  message: string
}

export default function Home() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    student_id: '',
  });

  // State to store the API response data
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState | null>(null);

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
      if(data.success == false){
        toast.error(data.message)
      }else if(data.success == true ){
        toast.success(data.message)
      }
      
      if (response.ok) {
        setResult(data.data);
        setFormData({ student_id: '' });
        
      } else {
        setError(data || 'Something went wrong');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError({ message: error.message });
      } else {
        setError({ message: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  const handleDownload = async () => {
    try {
      const downloadUrl = `https://result.bou.ac.bd/api/transcript/${result?.student_id}/download`;
      window.open(downloadUrl, '_blank');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError({ message: error.message });
      } else {
        setError({ message: 'Failed to initiate download.' });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white/75 backdrop-blur-sm">
          <nav className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-center">
              <Link href="/">
                <div className="flex items-center">
                  <Image src={justlogo} width={55} height={55} alt="logo" className="mt-2 mr-2" />
                  <Image src={logo} alt="logo" width={350} height={50} />
                </div>
              </Link>
            </div>
          </nav>
      </header>

      <main className="flex-grow container mx-auto py-2 px-4 sm:px-6 lg:px-8">
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
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Search Your Result</h2>
          <p className="text-sm text-gray-600">Enter your Student ID to view your results</p>
        </div>
          {/* Form handle */}
          <form className="max-w-md mx-auto mb-8" onSubmit={handleSubmit}>
            <div className="relative ">
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
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
          {/* Show Data */}
          {result && (
          <div className="w-full max-w-5xl space-y-6 mx-auto">
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={handleDownload} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-icon h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                  <span>Download</span>
                </button>
              </div>
              <div className="bg-white shadow border rounded-lg text-gray-600">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
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
                      <dd>{result.academic_year}</dd>
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
                </div>
              </div>
            </div>

          <div className="bg-white shadow border rounded-lg mt-6">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Note</h3>
              <p className="text-sm text-gray-600"> (-)- Waiver, AB- Absent, PR- Problem Related to OMR Sheet fill-up, RP- Expelled in the respective course, WH- Withheld, IC- Incomplete, NA- Not Applicable, X- No Grade Received </p>
            </div>
          </div>
        </div>
        )}
        
      </main>
      <footer className="border-t border-slate-200 bg-white/75 backdrop-blur-sm mt-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-sm text-slate-600">© Bangladesh Open University.</p>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-slate-600"> Development &amp; maintenance by: 
                  <a className="text-sm text-slate-600 hover:text-blue-600" href="https://facebook.com/creativehabibs" target="_blank" title="Habibur Rahaman"> Habibur Rahaman. </a>
                </p>
              </div>
            </div>
          </div>
      </footer>


    </div>
  );
}
