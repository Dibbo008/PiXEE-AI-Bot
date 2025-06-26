import React, { useContext } from 'react'
import "../App.css"
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { RiChatSmileAiFill } from "react-icons/ri";
import { SiPaddle } from "react-icons/si"
import { BsSendFill } from "react-icons/bs";
import { dataContext, prevUser, user } from '../context/UserContext';
import Chat from './Chat';
import { generateResponse } from '../gemini';
import zim from "../assets/Zippy_logo.jpg";

function Home() {

  let {startRes,setStartRes,popUp,setPopUp,input,setInput,feature,setFeature,showResult,setShowResult,prevFeature,setPrevFeature}=useContext(dataContext)

  async function handleSubmit(e) {
      
    setStartRes(true);
    setPrevFeature(feature);
    setShowResult("");
    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt=input;
    setInput("");
    let result=await generateResponse();
    setShowResult(result);
    setFeature("chat");
    user.data=null;
    user.mime_type=null;
    user.imgUrl=null;
  }

  function handleImage(e) {
    setFeature("upimg")
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend=(event)=>{
      let base64=event.target.result.split(",")[1]
      user.data=base64;
      user.mime_type=file.type;
      user.imgUrl=`data:${user.mime_type};base64,${user.data}`;
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className='home'>

        <nav>
            <div className="logo" onClick={()=>{
              setStartRes(false);
              setFeature("chaat");
            }}>PiXEE</div>

            <a
              className="logo-img"
              href="https://zippy-ai.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              title="Go to Zippy AI"
            >
              <img src={zim} alt="Zippy Logo" />
            </a>

        </nav>

        <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage}/>

        {!startRes ?
        <div className="hero">
          <span id='tag'>Shoot your thoughts! I'm listening...</span>
          <div className="cate">
            <div className="upImg" onClick={()=>{
              document.getElementById("inputImg").click();
            }}> 
              <BiSolidImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="genImg" onClick={()=>setFeature("genimg")}> 
              <RiAiGenerate2 />
              <span>Generate Image</span>
            </div>
            <div className="chat" onClick={()=>setFeature("chat")}>
              <RiChatSmileAiFill /> 
              <span>Lets's Talk</span>
            </div>
          </div>
          </div> : 
          <Chat />
          }

        <form className="input-box" onSubmit={(e)=>{
          e.preventDefault();
          if(input){
              handleSubmit(e)}
            
        }}>

        {popUp?
          <div className="pop-up">
            <div className="select-up" onClick={()=>{
              setPopUp(false);
              setFeature("chat");
              document.getElementById("inputImg").click();
            }}>
              <BiSolidImageAdd />
              <span>Upload Image</span>
            </div>
            <div className="select-gen" onClick={()=>{
              setPopUp(false);
              setFeature("genimg")}}>
              <RiAiGenerate2 />
              <span>Generate Image</span>
            </div>
          </div> : 
          null
        }
          
          <div id="add" onClick={() => {
            setPopUp(prev=> !prev);
          }}>
            {feature=="genimg" ? <RiAiGenerate2 id='genImg'/> : <SiPaddle /> }
          </div>

          <input type="text" placeholder='Type your thoughts here...' 
             onChange={(e)=>setInput(e.target.value)} 
             value={input}/>

          {input?
          <button id='submit'>
            <BsSendFill />
          </button> : null
          }
          
        </form>

    </div>
  )
}

export default Home