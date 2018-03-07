import React from 'react'
import { Table } from 'react-bootstrap'

const UserPage = ({ user }) => (
    <div>
        <h1 className="text-success">{user.name}</h1>
        <h2 className="text-danger">Added blogs:</h2>
        <Table striped>
            <thead>
                <tr>
                    <th>Blogs title</th>
                    <th>Blogs author</th>
                </tr>
            </thead>
            <tbody>
                {user.blogs.map(blog =>
                    <tr key={blog._id} >
                        <td>
                            {blog.title}
                        </td>
                        <td>
                            {blog.author}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)

export default UserPage