import { useSelector } from 'react-redux';
import { Button, Input } from 'reactstrap';
import blogService from '../services/blogService';

const CreateBlog = () => {

  const handleCreateBlog = async (event) => {
    event.preventDefault()   
    console.log(event) 
    try {
      await blogService.create({
        "title": event.target[0].value,
        // "author": createAuthor,
        "url": event.target[1].value
      })
      // alert(`Successfully Create post `)
      window.location = '/blogs'
    } 
    catch (exception) {
      alert('Failed. \n')
      console.error(exception)
    }

  }

  // const token = useSelector(state => state.user?.token)

  // if(!token) {
  //   return <h1>Please login first!</h1>
  // }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>Create Blog</h2>
      <div>
        title
        <Input type="text" name="title" />
      </div>
      {/* <div>
        author
        <Input type="text" name="author" />
      </div> */}
      <div>
        url
        <Input type="text" name="url" />
      </div>
      <Button type="submit" className="my-3">Create</Button>
    </form>
  )
}

export default CreateBlog