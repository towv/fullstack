const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb } = require('./test_helper')

// const initialBlogs = [
//     {
//         title: "Aurinkoista aamua",
//         author: "Hissanope",
//         url: "www.pirteaahuomenta.fi",
//         likes: 2
//     },
//     {
//         title: "Pirteää huomenta",
//         author: "TM",
//         url: "www.pirteaahuomenta.fi",
//         likes: 4
//     }
// ]

beforeAll(async () => {
    await Blog.remove({})

    // let blogObject = new Blog(initialBlogs[0])
    // await blogObject.save()

    // blogObject = new Blog(initialBlogs[1])
    // await blogObject.save()
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
describe('when GET', async () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(titles).toContain('Aurinkoista aamua')
    })
})
//GetAll above POST below
describe('when POST', async () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "Kahvi porisee",
            author: "Krisu",
            url: "www.pirteaahuomenta.fi",
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('Kahvi porisee')
    })

    test('blog without title is not added ', async () => {
        const newBlog = {
            url: "moi"
        }

        const intialBlogs = await api
            .get('/api/blogs')

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.titles)

        expect(response.body.length).toBe(intialBlogs.body.length)
    })
})

test('a valid blog with 0 likes when not defined ', async () => {
    const newBlog = {
        title: "Kahvi porisee",
        author: "Krisu",
        url: "www.pirteaahuomenta.fi"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')

    const likes = response.body.map(l => l.likes)

    expect(likes[likes.length - 1]).toBe(0)
})

test('blog without url, response 400 bad request ', async () => {
    const newBlog = {
        title: "NUuuuuUuurl",
        author: "Steeeffan"
    }

    const intialBlogs = await api
        .get('/api/blogs')

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api
        .get('/api/blogs')

    const titles = response.body.map(r => r.titles)

    expect(response.body.length).toBe(intialBlogs.body.length)
})

//Checking individual blog and removing blogs

test('a specific blog can be viewed', async () => {
    const resultAll = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const aBlogFromAll = resultAll.body[0]

    const resultBlog = await api
        .get(`/api/blogs/${aBlogFromAll.id}`)

    const blogObject = resultBlog.body

    expect(blogObject).toEqual(aBlogFromAll)
})
describe('deletion of a blog', async () => {
    test('a blog can be deleted', async () => {
        const newBlog = {
            title: 'HTTP DELETE poistaa resurssin joka on blogi',
            url: 'www.delete.del'
        }

        const addedBlog = await api
            .post('/api/blogs')
            .send(newBlog)

        const blogsAtBeginningOfOperation = await api
            .get('/api/blogs')

        await api
            .delete(`/api/blogs/${addedBlog.body.id}`)
            .expect(204)

        const blogsAfterDelete = await api
            .get('/api/blogs')

        const titles = blogsAfterDelete.body.map(r => r.title)

        expect(titles).not.toContain('HTTP DELETE poistaa resurssin joka on blogi')
        expect(blogsAfterDelete.body.length).toBe(blogsAtBeginningOfOperation.body.length - 1)
    })
})

describe('when EDIT', async () => {

    test('updated likes jikes', async () => {

        const beforeTest = await blogsInDb()

        blogToUpdate = beforeTest[beforeTest.length - 1]
        blogToUpdate.likes = blogToUpdate.likes + 1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const afterUpdate = await blogsInDb()

        expect(beforeTest.length).toBe(afterUpdate.length)
        expect(afterUpdate[afterUpdate.length - 1].likes).toBe(blogToUpdate.likes)
    })
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails password too short', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'roots',
            name: 'Bob',
            password: 's'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be atleast 3 characters long' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

})

afterAll(() => {
    server.close()
})
