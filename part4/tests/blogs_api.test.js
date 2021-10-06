const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
   
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test('there are three blogs returned as json', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier of blogs is "id"', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];
    expect(blog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
    const titlesAtEnd = await helper.blogsInDB();
    expect(titlesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = titlesAtEnd.map(b => b.title);
    expect(titles).toContain('First class tests');
});

test('request with no likes property will default to 0', async () => {
    const blogObject = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
    };

    const response = await api.post('/api/blogs').send(blogObject);
    expect(response.body.likes).toBe(0);
});

test('requests without title or url result in code HTTP 400 Bad Request', async () => {
    const blogObject = {
        author: "Edsger W. Dijkstra",
        likes: 5
    };

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(400)
        .expect('Content-Type', /application\/json/);
});

// test('blog with no title or link is not added', async () => {
//     const newBlog = {
//         author: "Robert C. Martin",
//         likes: 2,
//     };

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
//         .expect('Content-Type', /application\/json/);
    
//     const blogsAtEnd = await helper.blogsInDB();

//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
// });

// test('a specific blog can be viewed', async () => {
//     const blogsAtStart = await helper.blogsInDB();
//     const blogToView = blogsAtStart[0];

//     const resultBlog = await api
//             .get(`/api/blogs/${blogToView.id}`)
//             .expect(200)
//             .expect('Content-Type', /application\/json/);
    
//     const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

//     expect(resultBlog.body).toEqual(processedBlogToView);
// });

// test('a blog can be deleted', async () => {
//     const blogsAtStart = await helper.blogsInDB();
//     const blogToDelete = blogsAtStart[0];

//     await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .expect(204);

//     const blogsAtEnd = await helper.blogsInDB();
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

//     const titles = blogsAtEnd.map(b => b.title);
//     expect(titles).not.toContain(blogToDelete.title);
// });

afterAll(() => {
    mongoose.connection.close();
});