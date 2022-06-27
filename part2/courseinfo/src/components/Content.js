import Part from './Part';

const Content = (props) => {
    let count = 0;
    const parts = props.parts.map(p => {
      count += p.exercises;
      return <Part key={p.name} part={p.name} exercises={p.exercises} />;
    })
  
    return (
      <div>
        {parts}
        <b>Total of {count} exercises</b>
      </div>
    )
  }
  

export default Content