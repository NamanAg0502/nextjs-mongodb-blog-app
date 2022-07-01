import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
  },
  content: {
    type: String,
    required: [true, 'Please enter a content'],
  },
  author: {
    type: String,
    required: [true, 'Please enter a author'],
    default: 'Anonymous',
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  url: {
    type: String,
    required: [true, 'Please enter a URL'],
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
