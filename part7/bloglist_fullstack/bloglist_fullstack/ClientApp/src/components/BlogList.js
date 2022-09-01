import { useEffect, useState } from "react";

const BlogList = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    populateData()
  }, [])

  const populateData = async () => {
    const response = await fetch('api/blogs');
    const data = await response.json();
    setData(data);
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
          </tr>
        </thead>
        <tbody>
          {data.map(d =>
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>{d.author}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
}

export default BlogList