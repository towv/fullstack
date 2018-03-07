import { Table } from 'react-bootstrap'
import React from 'react'
import { NavLink } from 'react-router-dom'

const UsersPage = ({ users }) => (
    <div>
        <h1 className="text-success">Users</h1>
        <Table striped>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user._id} >
                        <td><NavLink to={`/users/${user._id}`}>
                            {user.name}
                        </NavLink>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)

export default UsersPage