import Footer from '../components/Footer';
import Posts from '../components/Posts';
import dbConnect from '../lib/dbConnect';
import Post from '../models/Post';

const Home = ({ posts }) => (
  <div className="relative h-screen">
    <Posts posts={posts} />
    <div className="absolute bottom-0 w-full mt-5">
      <Footer />
    </div>
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
