import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

const Form = ({ formId, forNewPost = true, postForm }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  //   Form UseState Function
  const [form, setForm] = useState({
    title: postForm.title,
    author: postForm.author,
    content: postForm.content,
  });

  //   PUT method to edit existing post
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data } = res.json();

      mutate(`api/posts/${id}`, data, false);
      router.push('/');
    } catch (error) {
      setMessage('Failed to update pet');
    }
  };

  //   PUT method to edit existing post
  const postData = async (form) => {
    try {
      const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add pet');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPost ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    const err = {};
    if (!form.title) err.name = 'Title is required';
    if (!form.author) err.author = 'Author is required';
    if (!form.content) err.content = 'Content is required';
    return err;
  };

  return (
    <>
      <form
        id={formId}
        className="flex flex-col items-center space-y-4 w-full mt-10"
      >
        <h1 className="text-2xl font-bold ">Add Post</h1>
        <div className="flex flex-col items-start lg:w-1/3 md:w-1/2 sm:w-2/3 w-11/12 mx-auto">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="border w-full px-3 py-1 rounded-md "
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start lg:w-1/3 md:w-1/2 sm:w-2/3 w-11/12 mx-auto">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            className="border w-full px-3 py-1 rounded-md "
            value={form.author}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start lg:w-1/3 md:w-1/2 sm:w-2/3 w-11/12 mx-auto">
          <label htmlFor="Content">Content</label>
          <textarea
            type="text"
            name="content"
            className="border w-full px-3 py-1 rounded-md "
            value={form.content}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="border px-4 py-1 rounded"
        >
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
