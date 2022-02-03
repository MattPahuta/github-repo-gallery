// target overview div - where profile info will appear
const overview = document.querySelector('.overview');
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

}