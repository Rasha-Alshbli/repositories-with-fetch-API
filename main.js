// main variables

let theInput = document.querySelector(".get-repo input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
}

// get repos function
function getRepos() {
    if (theInput.value == "") { // if value is empty
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    } else {
        
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then(response => response.json())

        .then(repositories => {
            //empty the container
            reposData.innerHTML = '';

            //loop on repositories
            repositories.forEach(repo => {
                
                //Create the main Div Element
                let mainDiv = document.createElement("div");

                //create repos name text
                let repoName = document.createTextNode(repo.name);

                //append the text to the main div
                mainDiv.appendChild(repoName);

                //create repo URL
                let theUrl = document.createElement('a');
                
                //create repo Url Text
                let theUrlText = document.createTextNode("Visit");

                //append the repo URL text to anchor tag
                theUrl.appendChild(theUrlText);

                // Add the Href
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                //set attribute blank
                theUrl.setAttribute('target', '_blank');

                //append url anchor to main div
                mainDiv.appendChild(theUrl);

                // create stars count span
                let starsSpan = document.createElement("span");

                // create the stars count text
                let starsText = document.createTextNode(`stars ${repo.stargazers_count}`);

                // add stars count text to stars span
                starsSpan.appendChild(starsText);

                //append stars count span to main Div
                mainDiv.appendChild(starsSpan);

                //add class on main div
                mainDiv.className = 'repo-box';

                //append the main Div to containeer
                reposData.appendChild(mainDiv);

            });

        });
    }
}