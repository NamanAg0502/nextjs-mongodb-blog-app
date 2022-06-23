import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import Post from '../../models/Post';

const PostPage = ({ post }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const postId = router.query.id;

    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (err) {
      setMessage('Failed to delete post');
    }
  };

  return (
    <div
      key={post._id}
      className="dark:bg-neutral-600 w-1/2 mx-auto mt-10 bg-neutral-100 p-3 rounded-md relative"
    >
      <h1 className="text-xl text-black">{post.title}</h1>
      <h4>{post.author}</h4>
      <p>{post.content}</p>
      <div className="flex-row flex space-x-3">
        <button
          onClick={handleDelete}
          type="button"
          className="bg-neutral-300 px-4 py-1 rounded-md"
        >
          Delete
        </button>
        <Link href="/[id]/edit" as={`/${post._id}/edit`}>
          <button type="button" className="bg-neutral-300 px-4 py-1 rounded-md">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();
  const post = await Post.findById(params.id).lean();
  post._id = post._id.toString();

  return {
    props: { post },
  };
}

export default PostPage;
