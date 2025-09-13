import { Button, Select, TextInput, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search as SearchIcon, ChevronDown } from 'lucide-react';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 9);
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }
    if (id === 'sort') {
      setSidebarData({ ...sidebarData, sort: value || 'desc' });
    }
    if (id === 'category') {
      setSidebarData({ ...sidebarData, category: value || 'uncategorized' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) return;

    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar / Filters */}
      <aside className="p-6 border-b md:border-r md:min-h-screen border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 md:w-72">
        <form
          className="flex flex-col gap-6 bg-gray-50 dark:bg-gray-800 shadow-md rounded-2xl p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Filter size={18} />
            <span>Filters</span>
          </div>

          {/* Search Term */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Search Term</label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              icon={SearchIcon}
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Sort</label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
              icon={ChevronDown}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Category</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
              icon={ChevronDown}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="international">International</option>
              <option value="national">National</option>
              <option value="local">Local</option>
            </Select>
          </div>

          <Button type="submit" gradientDuoTone="purpleToPink" fullSized>
            Apply Filters
          </Button>
        </form>
      </aside>

      {/* Posts Section */}
      <main className="flex-1">
        <header className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-4">
          <h1 className="text-2xl font-bold">Results</h1>
          <p className="text-sm text-gray-500">
            {posts.length > 0
              ? `${posts.length} posts found`
              : 'No posts yet'}
          </p>
        </header>

        <div className="grid gap-6 p-7 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <div className="flex justify-center items-center col-span-full py-10">
              <Spinner size="xl" />
            </div>
          )}
          {!loading && posts.length === 0 && (
            <p className="col-span-full text-center text-lg text-gray-500">
              No posts found.
            </p>
          )}
          {!loading &&
            posts &&
            posts.map((post) => (
              <div key={post._id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
        </div>


        {/* Show More */}
        {showMore && (
          <div className="flex justify-center py-6">
            <Button
              onClick={handleShowMore}
              gradientDuoTone="purpleToPink"
              pill
            >
              Show More
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
