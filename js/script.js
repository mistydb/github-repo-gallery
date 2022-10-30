// select div section with overview class for profile
const overview = document.querySelector(".overview");
//  select unordered list for the repos
const repoList = document.querySelector(".repo-list");
const username = "mistydb";


const getUserData = async function (){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    display(data);
};

getUserData();

const display = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data['avatar_url']} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data['public_repos']}</p>
  </div>`;
  overview.append(div);
  getRepos();
};

const getRepos = async function (){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const list = await fetchRepos.json();
    console.log(list);
    displayRepoInfo(list);
};

const displayRepoInfo = function (repos) {
    for (let repo of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    };
};

