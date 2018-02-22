import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          title
<input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author
<input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url
<input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: "",
      user: null,
      title: "",
      author: "",
      url: "",
      error: ""
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null
    })
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: ''
        })
      })
    this.setState({
      error: `new blog '${blogObject.title}' added`,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 2000)
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username
<input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
<input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in<button onClick={this.logout}>logout</button></p>
            <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
              <BlogForm
                onSubmit={this.addBlog}
                handleChange={this.handleBlogChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
              />
            </Togglable>
            <h2>blogs</h2>
            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;
