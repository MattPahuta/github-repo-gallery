// target overview div - where profile info will appear
const overview = document.querySelector('.overview');
const repoList = document.querySelector('.repo-list');

const username = 'MattPahuta';

// fetch data from GitHub api
const fetchGitHubData = async function() {
  const request = await fetch(`https://api.github.com/users/${username}`);
  const data = await request.json();
  console.log(data);
  
  // console.log(data.avatar_url)
  // console.log(data.name)
  // console.log(data.bio)
  // console.log(data.location)
  // console.log(data.public_repos)
  displayUserInfo(data);
}

fetchGitHubData();


const displayUserInfo = data => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('user-info');
  newDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`
  overview.append(newDiv);
  fetchRepos()
}

const fetchRepos = async function() {
  // fetch user's repos - list repos of user
  /* parameters - 
    - sort by most recently added to last updated - ?sort=updated
    - show up to 100 repos per page - &per_page=100
  */
  const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await request.json();
  console.log(data);
  displayRepoInfo(data);
}

const displayRepoInfo = repos => {
  for (repo of repos) {
    const li = document.createElement('li');
    li.classList.add('repo');
    li.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(li);
  }
}