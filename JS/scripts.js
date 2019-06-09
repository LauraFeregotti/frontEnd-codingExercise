let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

let apiUrlForGet = 'http://localhost:5000/api/v1.0?token=';
let url = 'http://localhost:5000/api/v1.0';
let author = 'Tom';
let token = 'laura-test';

var chatroom = prompt("Enter the name of the chatroom");
if (chatroom != null) {
  token = chatroom;
}
var nick = prompt("Enter your nick");
if (nick != null) {
  author = nick;
}

function sendData() {

    response = fetch(url, {
      method: 'POST',
      body: JSON.stringify({ author: author, message: textbox.value }),
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(response => { if (response.ok) getMessages() });
  }
  
  button.addEventListener('click', sendData);

  
  function getMessages() {
    endpoint = `${apiUrlForGet}${token}`;
    fetch(endpoint)
      .then(function (response) {
        return response.json();
  
      })
      .then(function (myJson) {
        console.log(myJson);
        for (let index = 0; index < myJson.length; index++) {
          let newMessage = document.createElement("li", { is : 'expanding-list' });
          newMessage.innerHTML = myJson[index].message + "    " + myJson[index].author + "   " + myJson[index].time;
          messages.appendChild(newMessage);
          textbox.value = "";
          document.replaceChild("li", { is : 'expanding-list' }, " ");
        }
        
  
      });
  
  };
  