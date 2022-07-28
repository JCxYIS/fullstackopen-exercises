import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import accountService from './services/account'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loginToken, setLoginToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // handler init login cache
    const tokenCached = window.localStorage.getItem('token')
    if(tokenCached) {
      setLoginToken(tokenCached)      
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
      setLoginToken(tokenGet)
      window.localStorage.setItem('token', tokenGet)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      alert('Login Failed. \n' + exception.response?.data?.message)
      // console.log(exception.response.data.message)
    }
  }

  /* -------------------------------------------------------------------------- */
  

  if(loginToken === null)
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
