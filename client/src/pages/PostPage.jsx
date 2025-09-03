import { Button, Spinner, Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import NepaliDate from "nepali-date-converter";

// Icons
import { Share2, Facebook, Instagram, Twitter, Link as LinkIcon, MessageCircle } from "lucide-react";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />

      {/* Date + Share + Read time */}
      <div className='flex justify-between items-center p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        {/* Nepali Date */}
        <span>
          {post && (() => {
            const date = new Date(post.createdAt);
            const nepaliDate = new NepaliDate(date);

            const months = [
              "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
              "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"
            ];
            const weekdays = [
              "आइतबार", "सोमबार", "मङ्गलबार", "बुधबार",
              "बिहीबार", "शुक्रबार", "शनिबार"
            ];
            const toNepaliNumber = (num) =>
              num.toString().replace(/[0-9]/g, (d) => "०१२३४५६७८९"[d]);

            const year = toNepaliNumber(nepaliDate.getYear());
            const month = months[nepaliDate.getMonth()];
            const day = toNepaliNumber(nepaliDate.getDate());
            const weekday = weekdays[nepaliDate.getDay()];

            return `${weekday}, ${month} ${day}, ${year}`;
          })()}
        </span>

        {/* Share Button */}
        <Dropdown
          inline
          label={
            <div className="flex items-center gap-2 font-bold">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>}
          arrowIcon={false}
        >
          <Dropdown.Item
            onClick={() => window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
              "_blank"
            )}
          >
            <Facebook className="w-4 h-4 mr-2" /> Facebook
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${post?.title}`,
              "_blank"
            )}
          >
            <Twitter className="w-4 h-4 mr-2" /> Twitter (X)
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => window.open(
              `https://api.whatsapp.com/send?text=${post?.title} ${encodeURIComponent(window.location.href)}`,
              "_blank"
            )}
          >
            <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => window.open(
              `https://www.instagram.com/`,
              "_blank"
            )}
          >
            <Instagram className="w-4 h-4 mr-2" /> Instagram
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
          >
            <LinkIcon className="w-4 h-4 mr-2" /> Copy Link
          </Dropdown.Item>
        </Dropdown>

        {/* Read Time */}
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
