import Link from 'next/link';
import { FaEdit, FaEye } from 'react-icons/fa';

const Posts = ({ posts }) => (
  <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 w-4/5 mx-auto mt-10">
    {posts.map((post) => (
      <div
        key={post._id}
        className="dark:bg-neutral-700 bg-neutral-100 p-3 rounded-md relative"
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={post.url ? post.url : 'https://picsum.photos/400/300'}
          alt={post.title}
          className="rounded-t-md"
        />
        <h1 className="text-2xl capitalize mt-3 font-medium leading-6">
          {post.title}
        </h1>
        <h4 className="italic capitalize my-2">{post.author}</h4>
        <p className="dark:text-neutral-400 text-neutral-500">
          {post.description}
        </p>
        <div className="flex-row flex space-x-3 mt-4 justify-end">
          <Link href="/[id]" as={`/${post._id}`}>
            <button
              type="button"
              className="dark:bg-neutral-600 bg-neutral-300 px-4 py-1 rounded-md flex flex-row items-center space-x-2"
            >
              <FaEye /> <span>View</span>
            </button>
          </Link>
          <Link href="/[id]/edit" as={`/${post._id}/edit`}>
            <button
              type="button"
              className="dark:bg-neutral-600 bg-neutral-300 px-4 py-2 rounded-md flex flex-row items-center space-x-2"
            >
              <FaEdit /> <span>Edit</span>
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default Posts;
