function loadAndDisplayUsers() {



        // check if the user is connected
        const connectedUser = localStorage.getItem('connectUser');
        if (!connectedUser) {
            window.location = 'login.html';
            return;
        }
    
    const userListElement = document.getElementById("userList");
    // Clear any existing content in the userListElement
    userListElement.innerHTML = "Loading...";
    // Retrieve the userList from Local Storage
    fetch('http://localhost:8080/api/v1/users/findAll')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    // Loop through the userList and create list items to display each user
    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div>
                    <i class="fa fa-user-circle"></i>
                    ${user.username} <i class="user-email">(${user.email})</i>
                </div>
                <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
            `;
        userListElement.appendChild(listItem);
    });
}

// Call the loadAndDisplayUsers function when the page loads
window.addEventListener("load", loadAndDisplayUsers);


function handleLogout(){
    fetch('http://localhost:8080/api/v1/users/logout', {
      method: 'POST',
      headers :{
        'Content-Type': 'application/json'
      },
      body: localStorage.getItem('connectUser')  
    })
    .then((response) => {
        return response;
    })
    .then((data) => {
        localStorage.removeItem('connectedUser');
        window.location.href ="login.html";
    })
}

const logout = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);


function handleNewMeeting(){
    const connectedUser = JSON.parse(localStorage.getItem('connectUser'));
    window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
}

const newMeetingBtn = document.getElementById("newMeetingBtn");
newMeetingBtn.addEventListener("click", handleNewMeeting);

function handleJoinMeeting(){
    const roomID = document.getElementById("meetingName").value;
    const connectedUser = JSON.parse(localStorage.getItem('connectUser'));

    // Add your logic to handle creating a new meeting here 
    const url = `videocall.html?roomID=${roomID}&username=${connectedUser.username}`;

    // Construct URL
    window.open(url, "_blank");
}

const joinMeetingBtn = document.getElementById("joinMeetingBtn");
joinMeetingBtn.addEventListener("click", handleJoinMeeting);
