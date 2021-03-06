const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog.toJSON());
    } else {
        res.status(404).end();
    }
});

blogsRouter.post('/', async (req, res, next) => {
    const blog = req.body;

    if (!blog.title || !blog.url) {
        return res.status(400).send({
            error: "title or url missing"
        });
    }

    const result = await new Blog(req.body).save();
    res.status(200).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({error : "no blog specified"});
    }

    const updatedBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    };

    const updatedBlogs = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {new: true});
    res.json(updatedBlogs);
});

module.exports = blogsRouter;