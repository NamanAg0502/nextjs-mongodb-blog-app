import Link from 'next/link';

const Posts = ({ posts }) => (
  <div className="grid grid-cols-3 gap-10 w-4/5 mx-auto mt-10">
    {posts.map((post) => (
      <div
        key={post._id}
        className="dark:bg-neutral-600 bg-neutral-100 p-3 rounded-md relative"
      >
        <h1 className="text-xl text-black">{post.title}</h1>
        <h4>{post.author}</h4>
        <p>{post.content}</p>
        <div className="flex-row flex space-x-3">
          <Link href="/[id]" as={`/${post._id}`}>
            <button
              type="button"
              className="bg-neutral-300 px-4 py-1 rounded-md"
            >
              View
            </button>
          </Link>
          <Link href="/[id]/edit" as={`/${post._id}/edit`}>
            <button
              type="button"
              className="bg-neutral-300 px-4 py-1 rounded-md"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default Posts;
