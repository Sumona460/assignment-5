
// console.log("js connected");
// sign in btn
const signBtn = document.getElementById('signBtn');

if(signBtn){
signBtn.addEventListener('click', function (){
const username = document.getElementById('username').value.trim().toLowerCase();
const password = document.getElementById('password').value.trim().toLowerCase();

const defaultUser = 'admin';
const defaultPassword = 'admin123';

if(username === defaultUser && password === defaultPassword){
    alert('Signin Successful');

    // new windows
    window.location.href = 'dashboard.html';
}
else{
    alert('Invalid Username or Password');
}

});
};




// all, open & close btn

const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => displayIssue(json.data));
};

const displayIssue = (issues) => {

    const btnContainer = document.getElementById('btn-container');
    btnContainer.innerHTML = "";

    const btnDiv = document.createElement('div');

    btnDiv.innerHTML = `
        <button class="btn btn-primary">All</button>
        <button class="btn btn-outline">Open</button>
        <button class="btn btn-outline">Closed</button>
    `;

    btnContainer.appendChild(btnDiv);
};

loadIssues();


// 50 issues length section
const loadLength = ()=> {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => displayLength(json.data));
};

const displayLength = (card) => {
  
    const issuesLength = document.getElementById('issues-length');
    issuesLength.innerHTML = "";

    const lengthDiv = document.createElement('div');
    lengthDiv.innerHTML = `<div class="flex justify-between w-full">
    <div class="flex gap-3 items-center">
      <div class="bg-[#ECE4FF] w-[50px] h-[50px] rounded-full flex justify-center items-center">
        <img src="assets/Aperture.png" alt="">
      </div>
      <div>
        <h2 class="text-xl font-semibold">${card.length} Issues</h2>
        <p class="text-[#64748B]">Track and manage your project issues</p>
      </div>
    </div>

    <div class="flex gap-4 text-sm items-top justify-end ">
      <span class="flex items-center gap-1">
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>Open</span>

        <span class="flex items-center gap-1">
        <span class="w-2 h-2 bg-purple-500 rounded-full"></span>Open</span>

    </div>
   
     </div>
`;
    issuesLength.append(lengthDiv);
};

 loadLength();