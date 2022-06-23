import dbConnect from '../../..//lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const post = await Post.findById(id);
        if (!post) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletePost = await Post.deleteOne({ _id: id });
        if (!deletePost) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ error: `Method ${method} not implemented` });
      break;
  }
}
