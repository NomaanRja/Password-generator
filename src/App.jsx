import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length , setlength]= useState(8)
  const [numallowed , setnumallowed] = useState(false)
  const [charallowed,setcharallowed ] = useState(false)
  const[password ,setpassword] = useState("")

  //ref hook
    const  passref =useRef(null)

    const passwordGenerator = useCallback(()=>{
      let pass =""
      let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

      if(numallowed){
        str+= "0123456789"
      }

      if(charallowed) str+= "!@#$%^&*(){}[]"

      for(let i =1 ; i<=length ; i++){
        let char = Math.floor(Math.random() *str.length)
            
           pass +=str.charAt(char)
      }

      setpassword(pass)
    } ,[length , numallowed ,charallowed,setpassword ])


    const copypasswordtoclipbord = useCallback(()=>{
      passref.current?.select();
      passref.current?.setSelectionRange(0,20)
      window.navigator.clipboard.writeText(password)
    }, [password])
  
    useEffect(()=>{
      passwordGenerator()
    },[length ,numallowed ,charallowed ,passwordGenerator])

  return (
    <>
    <div className='w-full  max-h-md  max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 pb-1
    bg-gray-700 '>
      <h1 className='text-white text-center my-3'>Paaword Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-10 '>
        <input 
        type="text"
        placeholder='password'
        value={password}
        className=' text-center outline-none w-full py-1 px-3 m'
        readOnly
        ref={passref}
        />

        <button 
        onClick={copypasswordtoclipbord}
        className='bg-blue-700 text-white font-semibold px-3'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          
          />
          <label >Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked ={numallowed}
           id="numberInput" 
           onChange={()=>{
            setnumallowed((prev)=>!prev)
           }}
           />
           <label >Numbers</label>

           
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked ={charallowed}
           id="charInput" 
           onChange={()=>{
            setcharallowed((prev)=>!prev)
       
           }}
           />
           <label >Character</label>
        </div>
      </div>
    </div>
    </>

  )
}
export default App
