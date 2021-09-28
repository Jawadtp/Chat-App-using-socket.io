import {useState, useEffect} from 'react'
import io from 'socket.io-client'
import './App.css';

const socket = io.connect('http://localhost:4000')

function App()
 {

  const [chat, setChat] = useState([])


  useEffect(() => 
  {
			socket.on("message", ({ name, message }) => 
      {
				setChat([ ...chat, { name, message } ])
			})
			

	},[ chat ])

  function onSendClick()
  {
    const name = document.getElementById('name').value
    const message = document.getElementById('message').value
    socket.emit('message', {name,message})
  }

  return (
    <div className="bodyWrapper">

      <div className="formWrapper">
        <div className="nameInput">
          <label for="name">Name</label>
        <div> 
          <input type="text" id="name" name="name"/>
        </div>
        </div>
        <br/>
        <div className="messageInput">
          <label for="message">Message</label>
          <div><input type="text" id="message" name="message"/></div>
        </div>
        <br/>
        <div className="buttonWrapper">
        <input type="button" id="sendButton" value="Send" onClick={onSendClick}/>
        </div>
      </div>

      <div className="messageBox">
        <div className="messageHeader">Messages</div>
        {chat.map((message)=> 
        {
          return(
          <div>
              {message['name']}: {' '}
              {message['message']}
          </div>)
        })}
      </div>
    </div>

  );
}

export default App;
