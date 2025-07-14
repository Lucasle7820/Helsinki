function Header({coursename}) {
    return <h2>{coursename}</h2>
  }
  
function Part({part}){
    console.log(part)
    return <p>{part.name} {part.exercises}</p>
  }
  
function Content({parts}) {
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
  </div>
      )
  }
  
function Total({ parts }) {
    const total = parts.reduce((acc, { exercises }) => {
      console.log('accumulator:', acc, '| current exercises:', exercises);
      return acc + exercises;
    }, 0);
    return <p>Total of {total} exercises</p>
  }
  
function Courses({ courses }) {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
          <div key={course.id}>
            <Header coursename={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    );
  }

export default Courses