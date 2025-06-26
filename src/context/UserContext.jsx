import React, { createContext } from 'react'
export const dataContext=createContext()

export let user={
  data:null,
  mime_type:null,
  imgUrl:null
}
export let prevUser={
  data:null,
  mime_type:null,
  prompt:null,
  imgUrl:null
}

function UserContext({ children }) {
    
    let [startRes,setStartRes]=React.useState(false)
    let [popUp,setPopUp]=React.useState(false)
    let [input,setInput]=React.useState("")
    let [feature,setFeature]=React.useState("chat")
    let [showResult,setShowResult]=React.useState("")
    let [prevFeature,setPrevFeature]=React.useState("chat")

    let value={
        startRes,setStartRes,
        popUp,setPopUp,
        input,setInput,
        feature,setFeature,
        showResult,setShowResult,
        prevFeature,setPrevFeature
    }
 
  return (
    <div>
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>      
    </div>
  )
}

export default UserContext