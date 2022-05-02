import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {MdAdd, MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'

const getItems = ()=>{
    let list = localStorage.getItem('lists')
    if(list){
        return list  = JSON.parse(localStorage.getItem('lists'))
    }
    else{
        return[]
    }
}
const Todo = () => {
    const [inputs,setInputs] = useState("");
    const [listitems,setListitems] = useState(getItems());
    const [toggle,setToggle] = useState(false)
    const [editval,setEditval]=useState("")
    const addItems = ()=>{
        if(!inputs){
            alert("You cannot save an empty note")
        }else if(inputs && toggle){
            setListitems(
                listitems.map((ele)=>{
                    if(ele.id===editval){
                        return {...ele,name:inputs}
                    }
                    return ele;
                })
            )
            setInputs("")
            setToggle(false)
                
            
        }
        else{
            const alllist = {id: new Date().getTime().toString(), name:inputs} 
            setListitems([...listitems,alllist]);
            setInputs("")
        }
        
    }
    const deleteItems=(indx)=>{
        const updatedList = listitems.filter((itms)=>indx !==itms.id)
        setListitems(updatedList)
    }
    const editItems=(id)=>{
        const upeditlist = listitems.find((ele)=>{
            return ele.id ===id
        });
        setInputs(upeditlist.name)
        setEditval(id)
        setToggle(true)
    }

    const clear=()=>{
        setListitems([]);
    }

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(listitems))
    },[listitems])
  return (
    <div className='main'>
        <div className='title'>
            <h1>Todo List Saver</h1>
        </div>
        <div className='inputs'>
            <input type="text" placeholder='Enter your todos...' value={inputs} onChange={(e)=>setInputs(e.target.value)}></input>
            {
                toggle ? <div className='add' onClick={addItems}><FaEdit></FaEdit></div>  :
                <div className='add' onClick={addItems}><MdAdd></MdAdd></div>
            }
            
        </div>
       
        <div className='items'>
            {
                listitems.map((itm)=>{
                    return(
                        <div className='eachitm'>
                            <h1>{itm.name}</h1>
                            <div className='edit'>
                                <div className='delete' onClick={()=>editItems(itm.id)}><FaEdit></FaEdit></div>
                                <div className='delete' onClick={()=>deleteItems(itm.id)}><MdDelete></MdDelete></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='delbtn'>
            <button onClick={clear}>Clear List</button>
        </div>
    </div>
  )
}

export default Todo