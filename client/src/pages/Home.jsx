import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 px-3 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl lg:text-6xl font-bold pt-10 text-red-800">
          Latest Nepal news in one touch
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
          TriNetra Post delivers fast, reliable, and unbiased updates on current events,
          politics, sports, technology, and entertainment, keeping you informed anytime,
          anywhere.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-base text-red-800 font-semibold hover:underline"
        >
          View all posts
        </Link>
        <div className="p-5 bg-red-800 dark:bg-slate-700 rounded-xl shadow-md">
          <CallToAction />
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 my-10 max-w-5xl mx-auto" />

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto px-4">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-red-800">
              Recent Posts
            </h2>

            {/* Responsive Grid for PostCards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/search"
                className="text-lg text-red-800 font-semibold hover:underline"
              >
                View all posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
