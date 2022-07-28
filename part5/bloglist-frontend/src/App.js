import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import accountService from './services/account'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [createTitle, setCreateTitle] = useState('')
  const [createAuthor, setCreateAuthor] = useState('')
  const [createUrl, setCreateUrl] = useState('')

  useEffect(() => {
    // handler init login cache
    const tokenCached = window.localStorage.getItem('token')
    if(tokenCached) {
      setToken(tokenCached)   
      handleTokenToLogin(tokenCached)   
    }

    // print blog
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  /* -------------------------------------------------------------------------- */

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const tokenGet = await accountService.login({
        "userName": username, 
        password,
      })      
      setToken(tokenGet)
      window.localStorage.setItem('token', tokenGet)
      setUsername('')
      setPassword('')
      handleTokenToLogin(tokenGet)
    } 
    catch (exception) {
      alert('Login Failed. \n' + exception.response?.data?.message)
      // console.log(exception.response.data.message)
    }
  }

  const handleTokenToLogin = async (token) => {
    try {
      const userGet = await accountService.getUser(token)
      setUser(userGet);
    }
    catch (exception) {
      alert('Login Failed. \n' + exception.response?.data?.message)
      logout()
    }
  }

  const logout = ()=>{
    setToken(null)
    setUser(null)
    window.localStorage.removeItem('token')
  }

  const handleCreateBlog = async (event) => {
    // event.preventDefault()
    
    try {
      blogService.create({
        "title": createTitle,
        "author": createAuthor,
        "url": createUrl
      }, token)
    } 
    catch (exception) {
      alert('Failed. \n')
    }

    window.location.reload()
  }

  /* -------------------------------------------------------------------------- */
  

  if(user === null)
    return (
      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  return (
    <div>
      <h1>Blog List</h1>
      <h3>Welcome, {user?.name} ({user?.username})</h3>
      <button onClick={logout}>Logout</button>

      <h2>Create New</h2>
      <CreateBlog onSubmit={handleCreateBlog} setTitle={setCreateTitle} setAuthor={setCreateAuthor} setUrl={setCreateUrl} />

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
