import Form from '../components/Form';

const New = () => {
  const postForm = {
    title: '',
    content: '',
    author: '',
  };

  return <Form postForm={postForm} />;
};

export default New;
