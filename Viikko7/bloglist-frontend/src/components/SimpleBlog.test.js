import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Matti',
            likes: 2
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleauthorDiv = blogComponent.find('.titleauthor')
        expect(titleauthorDiv.text()).toContain(blog.title)
        expect(titleauthorDiv.text()).toContain(blog.author)

        const likes = blogComponent.find('.likes')
        expect(likes.text()).toContain(blog.likes)
    })
    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Matti',
            likes: 2
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})