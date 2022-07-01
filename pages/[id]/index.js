import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
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
      className="dark:bg-neutral-700 lg:w-2/3 md:w-4/5 w-11/12 mx-auto my-10 bg-neutral-100 p-5 rounded-md relative"
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={post.url ? post.url : 'https://picsum.photos/400/200'}
        alt={post.title}
        className="rounded-t-md w-full"
      />
      <h1 className="text-3xl mt-4 font-semibold capitalize">{post.title}</h1>
      <h4 className="italic capitalize text-lg my-3">{post.author}</h4>
      <p className="text-lg text-neutral-600 dark:text-neutral-300">
        {post.content}
      </p>
      <div className="flex-row flex space-x-3 mt-5 justify-end">
        <button
          onClick={handleDelete}
          type="button"
          className="bg-red-500 px-4 py-2 rounded-md flex flex-row items-center space-x-2"
        >
          <FaTrashAlt />
          <span className="text-neutral-100">Delete</span>
        </button>
        <Link href="/[id]/edit" as={`/${post._id}/edit`}>
          <button
            type="button"
            className="dark:bg-neutral-600 bg-neutral-300 px-4 py-2 rounded-md flex flex-row items-center space-x-2"
          >
            <FaEdit />
            <span>Edit</span>
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
