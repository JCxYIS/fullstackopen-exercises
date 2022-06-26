const Header = (props) => <h1>{props.course}</h1>

/* -------------------------------------------------------------------------- */

const Content = (props) => {
  const parts = props.parts.map(p => <Part key={p.name} part={p.name} exercises={p.exercises} />)

  return (
    <div>
      {parts}
    </div>
  )
}


const Part = (props) => {
  return (
    <p>
        {props.part} {props.exercises}
    </p>
  );
}

/* -------------------------------------------------------------------------- */

const Total = (props) => {
  let total = 0;
  props.parts.map(p => total += p.exercises);

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}


/* -------------------------------------------------------------------------- */


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App