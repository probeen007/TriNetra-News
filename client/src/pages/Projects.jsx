import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto flex justify-center gap-8 items-center flex-col p-6'>
      <h1 className='text-4xl font-bold text-center'>Explore Our Projects</h1>
      <p className='text-lg text-gray-600 text-center max-w-3xl'>
        TriNetra is dedicated to providing fast, reliable, and unbiased news updates on current events, politics, sports, technology, and entertainment. Our projects aim to keep you informed anytime, anywhere with accurate and timely information.
      </p>
      <div className='w-full flex flex-col gap-6'>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold dark:text-gray-900'>
            Why Build Projects?
          </h2>
          <p className='text-gray-700 mt-2'>
            It provides news updates on current events, politics, sports, technology, and entertainment.
          </p>
        </section>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold dark:text-gray-900'>
            News you get:  
          </h2>
          <ul className='list-disc list-inside text-gray-700 mt-2'>
            <li>Fast and reliable updates on current events</li>
            <li>In-depth analysis of political developments</li>
            <li>Comprehensive coverage of sports events</li>
            <li>Timely information on technology trends</li>
            <li>Insights into the entertainment industry</li>
          </ul>
        </section>
      </div>
      <CallToAction />
    </div>
  );
}
