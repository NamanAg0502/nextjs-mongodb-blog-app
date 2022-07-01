import Form from '../components/Form';

const New = () => {
  const postForm = {
    title: '',
    content: '',
    author: '',
    url: '',
    description: '',
  };

  return <Form postForm={postForm} />;
};

export default New;
