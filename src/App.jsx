import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed){
      str += "12434567890"
    }
    if (charAllowed){
      str += "~!@#$%^&*()-_+[]{}"
    }
    for (let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])
  
  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-800'>
    <h1 className='text-center text-white my-2'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 text-black'><input type="text" value={password} ref={passwordRef} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 transition duration-300 ease-in-out hover:bg-blue-500'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"  min={6} max={30} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllowed} onChange={() => {setNumAllowed((prev) => !prev)}} />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}} />
          <label>Characters</label>
        </div>
        
      </div>
    </div>

    </>
  )
}

export default App
