let token = null

const setToken = (props) => {
    token = props
}

const blogs = [{"_id":"5a422a851b54a676234d17f7","title":"React patterns","author":"Michael Chan","url":"https://reactpatterns.com/","likes":7,"__v":0},{"_id":"5a422aa71b54a676234d17f8","title":"Go To Statement Considered Harmful","author":"Edsger W. Dijkstra","url":"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html","likes":5,"__v":0},{"_id":"5a422b3a1b54a676234d17f9","title":"Canonical string reduction","author":"Edsger W. Dijkstra","url":"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html","likes":12,"__v":0},{"_id":"5a422b891b54a676234d17fa","title":"First class tests","author":"Robert C. Martin","url":"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll","likes":10,"__v":0},{"_id":"5a422bc61b54a676234d17fc","title":"Aurinkoista aamua","author":"Hissanope","url":"www.pirteaahuomenta.fi","likes":2,"__v":0},{"_id":"5a422ba71b54a676234d17fb","title":"TDD harms architecture","author":"Robert C. Martin","url":"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html","likes":1,"__v":0},{"_id":"5a8e02f78c28de5d21aaddf9","title":"Iltakessu ja linnunlaulu","author":"Kersantti Karoliina","url":"www.pakkasyö.syö","likes":4,"user":{"_id":"5a8c101a164a6f447844ecd7","username":"mluukkai","name":"Matti Luukkainen"},"__v":0},{"_id":"5a8e0eef8c28de5d21aaddfa","title":"Ilmoitusasiaa","author":"Asiamies","url":"www.hyvääyötä","likes":0,"user":{"_id":"5a8c101a164a6f447844ecd7","username":"mluukkai","name":"Matti Luukkainen"},"__v":0},{"_id":"5a8e11ea8c28de5d21aaddfb","title":"Lisää värejä kankaalle","author":"Olis kiva jos kaikki ilmoitukset ei ois vihreitä","url":"www.kohtatänvarmaansaapoistettua.poisto","likes":0,"user":{"_id":"5a8c101a164a6f447844ecd7","username":"mluukkai","name":"Matti Luukkainen"},"__v":0},{"_id":"5a951e5cce2bf91b38f99829","title":"aurinko paistaa","author":"suntsu","url":"j3","likes":0,"user":{"_id":"5a8c101a164a6f447844ecd7","username":"mluukkai","name":"Matti Luukkainen"},"__v":0}]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }