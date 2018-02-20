const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likeCounter = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(likeCounter, 0)
}

const favouriteBlog = (blogs) => {
    let fav = {
        title: "",
        author: "",
        likes: -1
    }
    const favouriteFinder = (fav, blog) => {
        if (blog.likes > fav.likes) {
            fav = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
        return fav
    }

    return blogs.reduce(favouriteFinder, fav)
}

const mostBlogs = (blogs) => {
    const blugs = blogs.map((blog) => blog.author)

    let bligs = [{
        author: "",
        blogs: 0
    }]

    const blig = {
        author: "",
        blogs: 0
    }

    for (var i = 0; i < blugs.length; i++) {
        let found = false

        for (var j = 0; j < bligs.length; j++) {
            if (bligs[j].author === blugs[i]) {
                bligs[j].blogs = bligs[j].blogs + 1
                found = true
            }
        }
        if (!found) {
            let kurpa = {
                author: blugs[i],
                blogs: 1
            }
            bligs = bligs.concat(kurpa)
        }
    }

    const bliggerFinder = (blig, blog) => {
        if (blog.blogs > blig.blogs) {
            blig = {
                author: blog.author,
                blogs: blog.blogs
            }
        }
        return blig
    }

    return bligs.reduce(bliggerFinder, blig)
}

const mostLikes = (blogs) => {

    const blugs = blogs

    let bligs = [{
        author: "",
        likes: 0
    }]

    const blig = {
        author: "",
        likes: 0
    }

    for (var i = 0; i < blugs.length; i++) {
        let found = false

        for (var j = 0; j < bligs.length; j++) {
            if (bligs[j].author === blugs[i].author) {
                bligs[j].likes = bligs[j].likes + blugs[i].likes
                found = true
            }
        }
        if (!found) {
            let kurpa = {
                author: blugs[i].author,
                likes: blugs[i].likes
            }
            bligs = bligs.concat(kurpa)
        }
    }

    const bliggerFinder = (blig, blog) => {
        if (blog.likes > blig.likes) {
            blig = {
                author: blog.author,
                likes: blog.likes
            }
        }
        return blig
    }

    return bligs.reduce(bliggerFinder, blig)
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
