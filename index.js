function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  // console.log(this.responseText)
  // let repoList = "<ul>"
  // for(var i=0;i < this.responseText.length; i++) {
  //   repoList += "<li>" + this.responseText[i]["name"] + "</li>"
  // }
  // repoList += "</ul>"
  // document.getElementById("repositories").innerHTML = repoList
}s

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
//Let's look more closely at this line: r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'.
//The first interesting thing is that we're using a data attribute to hold the repo name. Data
//attributes make it super easy to pass data around between DOM elements and JS, so rather than jump
//through hoops trying to set and query id attributes, we'll do this.
//The second thing is our onclick is explicitly passing this to the getCommits function. We need to do
//this to make sure that the current element, that is, the link being clicked, is available to our
//getCommits function so that we can get at that data attribute later.


function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
// Here, we're creating a new instance of an XMLHttpRequest. We call open with the HTTP verb
//we want, in this case GET, and the URI for the request. Now that our request is set up and
//ready to go, we call send to make it happen.
//When we add the event listener to our req object, we set it up so that this will be
//our req object inside our callback function. So, inside showRepositories, we can
//access this.responseText to see the full

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}
//Here we grab that data-repo value through the dataset property, then set up an XHR request,
//with an event listener and callback function, just like we did in getRepositories
