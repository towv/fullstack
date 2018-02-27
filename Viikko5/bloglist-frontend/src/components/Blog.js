import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const ShowUser = ({ user }) => {
  if (user === undefined) {
    return null
  }
  return (
    <div>added by {user.name}</div>
  )
}

const ShowDelete = ({ blogCreator, user, handler }) => {
  if (blogCreator === undefined ||  blogCreator.username === user.username) {
    return (
      <button onClick={handler}>delete</button>
    )
  }
  return null
}

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: this.props.blog
    }
    this.delete = props.delete
    this.user = props.user
  }

  blogDetailVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleLike = async () => {
    const blogObject = {
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes + 1
    }
    const likedBlog = await blogService.update(this.state.blog._id, blogObject)
    this.setState({
      blog: likedBlog
    })

  }

  handleDelete = async () => {
    if (window.confirm(`delete ${this.state.blog.title} by ${this.state.blog.author}?`)) {
      try {
        await blogService.remove(this.state.blog._id)
        this.delete(this.state.blog)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle} className="blogDiv">
        <div onClick={this.blogDetailVisibility} className="nameDiv">
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={showWhenVisible} className="contentDiv">
          <a>{this.state.blog.url}</a>
          <div>{this.state.blog.likes} likes <button onClick={this.handleLike}>like</button></div>
          <ShowUser user={this.state.blog.user} />
          <ShowDelete blogCreator={this.state.blog.user} user={this.user} handler={this.handleDelete} />
        </div>
      </div>
    )
  }
}

export default Blog