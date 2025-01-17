/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
//import { Divider } from "@chakra-ui/react";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  //console.log("we are in addgames to page argument:", games);
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    //console.log(" adding game in addGamesToPage");
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.innerHTML = `
        <h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        <img class="game-img" src="${games[i].img}" alt="${games[i].name}"/> 
        `;
    // console.log("herer is teh card created: ", card);
    gamesContainer.appendChild(card);
  }

  // create a new div element, which will become the game card

  // add the class game-card to the list

  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")

  // append the game to the games-container
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
console.log("the contribution card element", contributionsCard);

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
  //2 arguments: counter & list of games
  return total + game.backers;
}, 0);
console.log("the total contributions", totalContributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);
console.log("total raised: " + totalRaised);
raisedCard.innerHTML = `${totalRaised.toLocaleString("en-US")}`;
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numberOfGames = GAMES_JSON.reduce((total, game) => {
  return total + 1;
}, 0);

console.log("Number of games", numberOfGames);
gamesCard.innerHTML = `${numberOfGames}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let notMet = GAMES_JSON.filter((game) => {
    return game.goal >= game.pledged;
  });
  console.log("funding not met: ", notMet);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(notMet);
}
//filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let met = GAMES_JSON.filter((game) => {
    return game.goal <= game.pledged;
  });
  console.log("funding met: ", met);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(met);
}
//filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document
  .getElementById("unfunded-btn")
  .addEventListener("click", filterUnfundedOnly);
const fundedBtn = document
  .getElementById("funded-btn")
  .addEventListener("click", filterFundedOnly);
const allBtn = document
  .getElementById("all-btn")
  .addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.reduce((sum, game) => {
  if (game.pledged < game.goal) {
    return sum + 1;
  } else {
    return sum;
  }
}, 0);
// create a string that explains the number of unfunded games using the ternary operator
const unfundedStr =
  unfundedCount > 1
    ? `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${
        numberOfGames - unfundedCount
      } games. Currently ${unfundedCount} games remain unfunded.We need your help to fund these amazing games!`
    : `A total of ${totalRaised.toLocaleString("en-US")} has been raised for ${
        numberOfGames - unfundedCount
      } games, we need your help funding one more game.`;
// create a new DOM element containing the template string and append it to the description container
const unfundedAmount = document.createElement("p");
unfundedAmount.textContent = unfundedStr;
descriptionContainer.appendChild(unfundedAmount);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("div");
topGameElement.innerHTML = `<h3>${topGame.name}</h3>`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner-up item
const secondGameElement = document.createElement("div");
secondGameElement.innerHTML = `<h3>${secondGame.name}</h3>`;
secondGameContainer.appendChild(secondGameElement);
console.log("this is rest: ", rest);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
