import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'


const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <div>
            <ControlLabel>title</ControlLabel>
            <FormControl
              value={title}
              name='title'
              onChange={handleChange}
            />
          </div>
          <div>
            <ControlLabel>author</ControlLabel>
            <FormControl
              value={author}
              name='author'
              onChange={handleChange}
            />
          </div>
          <div>
            <ControlLabel>url</ControlLabel>
            <FormControl
              value={url}
              name='url'
              onChange={handleChange}
            />
          </div>

          <Button bsStyle="success" type="submit">luo</Button>
        </FormGroup>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm