"use client"
import Image from "next/image";
import { justlogo, logo } from "../../public/img";
import { useState } from 'react';



export default function Home() {
  const [formData, setFormData] = useState({
    student_id: '',
  });
  const [result, setResult] = useState(null);  // State to store the API response
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null);  // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
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
    } catch (error) {
      // Handle network errors or other errors
      setError(error.message || 'An error occurred');
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
            <Image src={justlogo} width={55} height={55} alt="logo" className="mt-2 mr-2"/>
            <Image src={logo} alt="logo" width={350} height={50}/>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto h-screen justify-center dark:bg-white/75">
      


      <div className="mb-8 overflow-hidden" data-v-2fd469dd="">
        <div className="bg-cyan-50 border-cyan-200 rounded-lg shadow-sm" data-v-2fd469dd="">
          <div className="py-2 px-4" data-v-2fd469dd=""><div className="flex items-center" data-v-2fd469dd="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-icon h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" data-v-2fd469dd=""><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
            <div className="overflow-hidden flex-grow" data-v-2fd469dd="">
              <div className="animate-marquee-horizontal whitespace-nowrap" data-v-2fd469dd="">
                <span className="inline-flex items-center mx-4 text-gray-700" data-v-2fd469dd="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone-icon h-4 w-4 mr-1" data-v-2fd469dd=""><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                  </svg> BOU exam result site is up!!!</span>
                  <span className="inline-flex items-center mx-4 text-gray-700" data-v-2fd469dd="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone-icon h-4 w-4 mr-1" data-v-2fd469dd=""><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                    </svg> HSC exam-2024 result has been published!</span>
                    </div>
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
                <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded-r-md">
                {loading ? 'Loading...' : 'Search'}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">Error: {error}</p>}
            {/* Download Button */}
            <div data-v-2fd469dd="" className="flex justify-end mb-4">
              <button data-v-2fd469dd="" className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
                <svg data-v-2fd469dd="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-icon h-5 w-5 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                <span data-v-2fd469dd="">Download</span>
                </button>
            </div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            {/* Show Data */}
            <div data-v-2fd469dd="" className="shadow rounded-lg text-gray-600">
              <div data-v-2fd469dd="" className="p-4">
                  <h3 data-v-2fd469dd="" className="text-lg font-semibold mb-2">Student Information</h3>
                  {result && (
                    
                  <dl data-v-2fd469dd="" className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Program:</dt>
                        <dd data-v-2fd469dd="" className="">Higher Secondary Certificate</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Study  Center:</dt>
                        <dd data-v-2fd469dd="" className="">Nawab Habibulla Model School &amp; College, Uttara, Dhaka</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Student  I D:</dt>
                        <dd data-v-2fd469dd="" className="">{result.id}</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Student  Name:</dt>
                        <dd data-v-2fd469dd="" className="">BIJOY HOSSAIN</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Father  Name:</dt>
                        <dd data-v-2fd469dd="" className="">MD. SHA ALAM</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Mother  Name:</dt>
                        <dd data-v-2fd469dd="" className="">SHILA</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Batch:</dt>
                        <dd data-v-2fd469dd="" className="">20</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">Passing  Year:</dt>
                        <dd data-v-2fd469dd="" className="">2024</dd>
                    </div>
                    <div data-v-2fd469dd="" className="flex justify-between sm:col-span-1">
                        <dt data-v-2fd469dd="" className="font-semibold">G P A:</dt>
                        <dd data-v-2fd469dd="" className="">3.14</dd>
                    </div>
                  </dl>
                  )}
              </div>
            </div>


          </div>
        </div>
       
      </main>
    </div>
  );
}
