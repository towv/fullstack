import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })
    describe('when user is not logged', () => {

        it('renders no blogs if user is not logged in', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(0)
            const loginForm = app.find('.app')
            expect(loginForm.text()).toContain("Log in")
        })
    })
    describe('when user is logged', () => {
        beforeEach(() => {
            // luo sovellus siten, että käyttäjä on kirjautuneena
            const user = {
                username: 'Duquan',
                token: '123',
                name: 'Django'
            }

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all notes are rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(blogService.blogs.length)
        })
    })
})