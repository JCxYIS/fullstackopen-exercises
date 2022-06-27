import Course from './components/Course'


/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */

// const Total = (props) => {
//   let total = 0;
//   props.parts.map(p => total += p.exercises);

//   return (
//     <div>
//       <p>Number of exercises {total}</p>
//     </div>
//   )
// }


/* -------------------------------------------------------------------------- */


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const coursesHtml = courses.map(course => <Course key={course.id} course={course} />)

  return  (
    <div>
      <h1>Web Development Curriculum</h1>
      {coursesHtml}
    </div>
  )
}

export default App