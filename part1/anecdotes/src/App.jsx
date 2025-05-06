import { useState } from 'react'


const Headlines = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick} > {text} </button>
}

const Anecdotes = ({text}) => {
  return <div>{text}</div>
}

const HasVotes = ({votes}) => {
  return <div>has {votes} votes </div>
}


const Block1 = ({anecdotes, selected, votes, HandleSelected, HandleVotes}) => {
  return (
    <div>
      <Headlines text="Anecdote of the day" />
      <Anecdotes text={anecdotes[selected]} /> <br/>
      <HasVotes votes= {votes[selected]} /> <br/>
      <Button onClick={()=>HandleVotes()} text="vote" /> 
      <Button onClick={()=>HandleSelected()} text="next anecdote" /> 
    </div>
  )
}


const Block2 = ({anecdotes, votes}) => {

  const maxVotes = Math.max(...votes);     
  const maxIndex = votes.indexOf(maxVotes);
  return (
  <div>
    <Headlines text="Anecdote with most votes" />
    <Anecdotes text={anecdotes[maxIndex]} /> <br/>
    <HasVotes votes= {votes[maxIndex]} /> <br/>
  </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const HandleSelected = () => {
    let next = selected;
    while (next === selected) {
      next = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(next);
  };
  

  const HandleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1
    setVotes(copy)
    console.log(copy)
  }

  return (
    <div>
      <Block1 anecdotes={anecdotes} selected={selected} votes={votes}
      HandleSelected={HandleSelected} HandleVotes={HandleVotes}/>
      <Block2 anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App