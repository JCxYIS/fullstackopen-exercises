import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import accountService from './services/account'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    }
  }

  const logout = ()=>{
    setToken(null)
    setUser(null)
    window.localStorage.removeItem('token')
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
      <h2>blogs</h2>
      <h4>Welcome, {user?.name}</h4>
      <button onClick={logout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
