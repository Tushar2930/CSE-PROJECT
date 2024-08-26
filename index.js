const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.querySelector('.inpform');
const messageINP = document.querySelector('.INPtext');
var messageContainer = document.querySelector(".chats");

const addtext = (message, position) => {
    var messageElement = document.createElement('div');
    // const headElement = document.createElement('div');
    // headElement.innerText = admin;
    // headElement.classList.add("msghead");
    // console.log(headElement);
    // // if (admin == 'oth') {
    // messageElement.appendChild(headElement);
    // console.log(messageElement);
    // // }
    messageElement.classList.add('messaged');
    messageElement.innerHTML = message;
    messageElement.classList.add(position);

    messageContainer.appendChild(messageElement);

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageINP.value;
    addtext(`${message}`, 'right');
    socket.emit('send', message);
    messageINP.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

const name = prompt('Enter your name');

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    var out = name + " " + " joined the chat";
    addtext(`${name} joined the chat`, 'middle');
    // console.log(name);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('receive', data => {
    addtext(`${data.name} :<br>
    ${data.message}`, 'left');
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on('left', data => {
    addtext(`${data} left the chat`, 'middle');
    messageContainer.scrollTop = messageContainer.scrollHeight;
})