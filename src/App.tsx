import { useState } from 'react'
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Button variant="contained" onClick={() => setCount((count) => count + 1)}>start</Button>
      <p>{count}</p>
    </div>
  )
}

export default App
