import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, error } = useSWR(id ? `/api/posts/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!post) return <p>Loading...</p>;

  const postForm = {
    title: post.title,
    author: post.author,
    content: post.content,
  };

  return (
    <Form formId="edit-post-form" postForm={postForm} forNewPost={false} />
  );
};

export default EditPost;
