import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col">
      {/* Image */}
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm text-gray-500 mb-4">
          {post.category}
        </span>

        {/* Button */}
        <Link
          to={`/post/${post.slug}`}
          className="mt-auto inline-block border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors duration-300 text-center py-2 rounded-md"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
