import React from 'react'
import { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

function Chat() {

  let {input,setInput,prevInput,setPrevInput,showResult,setShowResult,feature,setFeature,prevFeature,setPrevFeature}=useContext(dataContext)

  return (
    <div className='chat-page'>

        <div className="user">
            {
            prevFeature=="upimg" ? 
             <><img src={prevUser.imgUrl} alt=''/>
             <span>{prevUser.prompt}</span></> : <span>{prevUser.prompt}</span>
            }
        </div>

        <div className="ai">
            {
            prevFeature=="genimg" ? <>
             {!showResult ? <span>😬 Can't make magic for free! Image generation is a premium treat — will be added soon...</span> : <img src={prevUser.imgUrl} alt=''/>}</> : 
             !showResult ? <span>Warming up the pixels...</span> : <span>{showResult}</span>
            }
        </div>
 
    </div>
  )
} 

export default Chat