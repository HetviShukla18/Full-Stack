import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState({first :'', last: ''})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setName((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <h1>Count {count}</h1>
      </div>
      <div>
          <button onClick={() => setCount(0)}>
          Reset
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement
        </button>
             <button onClick={() => setCount((count) => count + 5)}>
          Increment 5
        </button>
      </div>
      <div>
        <h1>Welcome to Charusat!</h1>
        <div>
          <h2>First Name: 
          <input
            type="text"
            name="first"
            placeholder="First Name"
            value={name.first}
            onChange={handleChange}
          />
          </h2>
          </div>
          <div>
            <h2>last Name: 
          <input
            type="text"
            name="last"
            placeholder="Last Name"
            value={name.last}
            onChange={handleChange}
          />
          </h2>
        </div>
        <div>
          <h2>
            First Name: {name.first}
          </h2>
        </div>
        <div>
          <h2>
            Last Name: {name.last}
          </h2>
        </div>
      </div>
    </>
  )
}

export default App
