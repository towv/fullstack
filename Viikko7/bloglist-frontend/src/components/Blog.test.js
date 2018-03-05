import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('before clicking name the details are not displayed', () => {

        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Matti',
            likes: 2
        }
        const user = {
            name: "Ville"
        }
        const del = () => {
            return null
        }
        const blogComponent = shallow(<Blog blog={blog} user={user} delete={del} />)

        const nameDiv = blogComponent.find('.nameDiv')
        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
        expect(nameDiv.text()).not.toContain(blog.likes)
    })
    it('after clicking name the details are displayed', () => {

        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Matti',
            likes: 2
        }
        const user = {
            name: "Ville"
        }
        const del = () => {
            return null
        }
        const blogComponent = shallow(<Blog blog={blog} user={user} delete={del} />)

        // haetaan klikattava osa komponentista
        const nameDiv = blogComponent.find('.nameDiv')
        nameDiv.simulate('click')

        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const contentDiv = blogComponent.find('.contentDiv')
        expect(contentDiv.text()).toContain(blog.likes)
    })
})