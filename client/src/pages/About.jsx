import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About TriNetra Post
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Trinetra Post is a dynamic press website dedicated to delivering timely,
              accurate, and engaging news coverage. With a commitment to keeping readers informed,
              it serves as a trusted digital platform for breaking stories, in-depth articles, and thoughtful analysis.
              The platform covers a wide range of topics, from politics and social issues to culture, sports, and technology, ensuring that readers have access to diverse perspectives and well-rounded reporting.
            </p>

            <p>
              At TriNetra Post, we believe in the power of journalism to inform, inspire, and drive positive change. Our team is dedicated to uncovering the truth and providing our audience with the information they need to make informed decisions.
            </p>

            <p>
              Whether you're looking for the latest headlines or in-depth features, TriNetra Post is your go-to source for reliable news and insightful commentary. Join us on our mission to inform and engage readers around the world. 
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}