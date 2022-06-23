import Posts from '../components/Posts';
import dbConnect from '../lib/dbConnect';
import Post from '../models/Post';

const Home = ({ posts }) => (
  <div>
    <Posts posts={posts} />
  </div>
);

export async function getServerSideProps() {
  await dbConnect();
  const result = await Post.find({});
  const posts = result.map((doc) => {
    const post = doc.toObject();
    post._id = post._id.toString();
    return post;
  });
  return {
    props: { posts },
  };
}

export default Home;
