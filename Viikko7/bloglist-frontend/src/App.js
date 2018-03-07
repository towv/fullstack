import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const activeStyle = {
  backgroundColor: 'pink',
  width: 4,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  height: '105%'
}

const Menu = () => (
  <div>
    <NavLink activeStyle={activeStyle} exact to="/">mainpage</NavLink> &nbsp;
        <NavLink activeStyle={activeStyle} to="/users">users</NavLink> &nbsp;
        <NavLink activeStyle={activeStyle} to="/create">create new</NavLink>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  async componentWillMount() {
    const blogs = await blogService.getAll();
    const users = await userService.getAll();

    // blogService.getAll().then(blogs =>
    //   this.setState({ blogs })
    // )
    // userService.getAll().then(users =>
    //   this.setState({ users })
    // )
    this.setState({ blogs: blogs, users: users });

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    this.setState({
      notification: {
        message, type
      }
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 10000)
  }

  like = (id) => async () => {
    const liked = this.state.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b => b._id !== id)
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    const result = await blogService.create(blog)
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({
      title: '',
      url: '',
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id) => {
    return this.state.users.find(u => u._id === id)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div className="container">
          <Notification notification={this.state.notification} />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <FormGroup>
              <div>
                <ControlLabel>käyttäjätunnus</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginChange}
                />
              </div>
              <div>
                <ControlLabel>salasana</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginChange}
                />
              </div>
              <Button bsStyle="success" type="submit">kirjaudu</Button>
            </FormGroup>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.state.blogs.sort(byLikes)

    return (
      <div className="container">
        <Notification notification={this.state.notification} />

        {this.state.user.name} logged in <Button bsStyle="warning" onClick={this.logout}>logout</Button>

        <Router>
          <div>
            <Menu />
            <Route exact path="/" render={() => <div><h2>blogs</h2>
              {blogsInOrder.map(blog =>
                <Blog
                  key={blog._id}
                  blog={blog}
                  like={this.like(blog._id)}
                  remove={this.remove(blog._id)}
                  deletable={blog.user === undefined || blog.user.username === this.state.user.username}
                />
              )}
            </div>} />
            <Route exact path="/users" render={() => <UsersPage users={this.state.users} />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserPage user={this.userById(match.params.id)} />} />
            <Route path="/create" render={() => <Togglable buttonLabel='uusi blogi'>
              <BlogForm
                handleChange={this.handleLoginChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;