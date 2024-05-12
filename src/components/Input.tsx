import { useState } from "react"

export const Input = () => {

  const [val, setVal] = useState('')

  // let val = ''

  return <label>
    <div>value: {val}</div>
    <input onChange={(event) => setVal(event.target.value)}/>
  </label>
}