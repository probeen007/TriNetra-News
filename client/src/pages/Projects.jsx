import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-[rgb(16,23,42)] transition-colors'>
      {/* Page Heading */}
      <h1 className='text-4xl font-bold text-center text-gray-900 dark:text-gray-200'>
        Explore Our Projects
      </h1>
      <p className='text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mt-3'>
        TriNetra is dedicated to providing fast, reliable, and unbiased news updates on current events, politics, sports, technology, and entertainment. Our projects aim to keep you informed anytime, anywhere with accurate and timely information.
      </p>

      {/* Sections */}
      <div className='w-full flex flex-col gap-6 mt-6 max-w-4xl'>
        <section className='bg-white dark:bg-[rgb(24,32,56)] p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-200'>
            Why Build Projects?
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            It provides news updates on current events, politics, sports, technology, and entertainment.
          </p>
        </section>

        <section className='bg-white dark:bg-[rgb(24,32,56)] p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-200'>
            News you get:
          </h2>
          <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1'>
            <li>Fast and reliable updates on current events</li>
            <li>In-depth analysis of political developments</li>
            <li>Comprehensive coverage of sports events</li>
            <li>Timely information on technology trends</li>
            <li>Insights into the entertainment industry</li>
          </ul>
        </section>
      </div>

      {/* CallToAction Component */}
      <div className='w-full flex justify-center mt-8'>
        <div className='w-full sm:w-11/12 lg:w-4/5'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
