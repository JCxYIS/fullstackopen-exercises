import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import blogService from "../services/blogService";

const BlogList = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    refershData()
  }, [])

  const refershData = async () => {
    const response = await fetch('api/blogs');
    const data = await response.json();
    setData(data);
  }

  const likeBlog = async (blogId) => {
    try {
      await blogService.like(blogId)
    }
    catch(e) {
      alert("Like Failed: "+ e.response.statusText)
    }
    refershData()
  }

  const deleteBlog = async (blogId) =>{
    try {
      await blogService.remove(blogId)
    }
    catch(e) {
      alert("Delete Failed: "+ e.response.statusText)
    }
    refershData()
  }


  if (data === null)
    return <h2>Loading...</h2>
  else
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d =>
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>{d.author}</td>
              <td>{d.likes}</td>
              <td>
                <Button onClick={() => likeBlog(d.id)}>Like</Button> 
                <Button onClick={() => deleteBlog(d.id)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
}

export default BlogList