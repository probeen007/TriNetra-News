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
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
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