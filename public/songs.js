// Setting up variables for HTML elements using DOM selection, including form element and song list elements under form
const form = document.getElementById('songform');
const songlistElem = document.querySelector('#songs');

// Select change event, directly update the attribute for the img src 
// selectGenre - selects from the option values <select>
// selectGenre is the object inside the HTML for the select button

const selectGenre = document.querySelector('select')
const img = document.querySelector('img')
const genre = ["./genreImages/Electronic dance music.jpeg", "./genreImages/RNB.jpeg", "./genreImages/Pop music.jpeg", "./genreImages/Hip hop.jpeg", "./genreImages/Electronic dance music.jpeg", "./genreImages/Rock.jpeg"]

var selectedImg = "./genreImages/Electronic dance music.jpeg";
selectGenre.addEventListener('change', () => {
  selectedImg = genre[selectGenre.selectedIndex];
  console.log(selectedImg);
})

//  Event after log entry button 
//  addSong will add all values including id, pushing these values into songlist and call displaySong
// Listening out for submission event on the form itself
form.addEventListener('submit', function(event) {
  // Block the default submission behaviour
  event.preventDefault();
  // All values below come from the form
  // addSong function being called with the following input elements
  addSong(
    form.elements.songName.value,
    form.elements.artist.value,
    form.elements.genre.value,
    form.elements.mood.value,
    form.elements.description.value
  );
})

// Taking song items object and creating a new list item element, setting the attribute for the element
// Data id is the date, create class for li - allows me to search up all the li items for last step to remove record
// You need to find the li through its id set by setattribute, where we set the song.id to the dataid

function displaySongs() {
  // Work out if songs need to be displayed on the page
  songlistElem.innerHTML = "";
  let localSongs = JSON.parse(localStorage.getItem('songs'));
  console.log("list local songs");
  console.log(localSongs);

  // Checks to see if the localSongs element is empty
  if (localSongs !== null) {

    // ForEach loop to go through the array we stored as localSongs variable
    localSongs.forEach((song) => {

      let item = document.createElement('li');
      // song.id retrieves id of song object
      item.setAttribute('dataid', song.id);
      item.className = "songs-li";
      // innerHTML is used to format how song list items are displayed
      item.innerHTML =
        `<div class="item">
        <div class="item-mood-row">
            ${song.mood}
        </div>
        <div class="item-song-row">
            <div class="img">
                <img id="genre" src='${song.myImage}' alt='${song.genre}'  onclick="image(this, ${song.id}, '${song.description}')">
            </div>
            <div class="item-song-name">
                <b>${song.songName}</b> <br> ${song.artist}
            </div>
            <div class="item-created-time">
            ${song.formattedDate}
            </div>
        </div>
      </div> `;

      // Appends that item to the songlistElem established in line 3
      songlistElem.appendChild(item);
      form.reset();

    }) //Closing brackets for forLoop
  } // Closing bracket for if statement
}

//This array for song items added is no longer needed as I have the localSong array, reducing the complexity of my code
// var songList = [];

var localSongs = JSON.parse(localStorage.getItem('songs'));

// Time variable attached to song that is created, each value is unique happening at current time

// Function to add songs to the list
function addSong(songName, artist, genre, mood, description) {
  // Get the current date and time
  var currentDate = new Date();
  var month = currentDate.toLocaleString("en-US", { month: "short" });
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var ampm = hour >= 12 ? "PM" : "AM";

  // Format the date and time, retrieved from chatGPT and https://stackoverflow.com/questions/1001937/auto-insert-date-and-time-in-form-input-field
  var formattedDate = month + " " + day + ", " + year + " - " + hour + ":" + (minute < 10 ? "0" + minute : minute) + ampm;

  // Creating the object, directly passing in the input parameters
  let song = {
    id: Date.now(),
    songName,
    artist,
    genre,
    mood,
    description,
    formattedDate,
    myImage: selectedImg
  }

  // Checks local storage if an item/items exists
  // Fetch and parse localStorage value
  localSongs = JSON.parse(localStorage.getItem('songs'));

  // Checks whether variable localSongs is empty (null) or contains a value
  // If there are no items in local storage:
  if (localSongs == null) {
    localSongs = [song];
  } else {
    // Checks to see if there is an existing item with the same properties
    if (localSongs.find(element => element.id === song.id)) {
      console.log('Task id already exists');
    } else {
      localSongs.push(song);
    }
  }
  
  // Set this new item localSongs in our localStorage object
  localStorage.setItem('songs', JSON.stringify(localSongs))
  // Call displayTask after the object is pushed 
  displaySongs();
}

// Get the modal box
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption, being the genre the user inputted 
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var description = document.getElementById("description");
var delButton = document.getElementsByClassName("del-button")[0];
var modalItem = null;
var modalLiItem = null;

function image(img, songId, descText) {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
  description.innerHTML = descText;
  modalItem = img;
  modalLiItem = findLiElementById(songId);
}

function findLiElementById(songId) {
  var liItems = document.getElementsByClassName("songs-li");
  for (i = 0; i < liItems.length; i++) {
    if (liItems[i].getAttribute("dataid") == songId) {
      console.log(songId);
      return liItems[i];
    }
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Listen for when the delete button is clicked, where we loop through tasks in array to check whether the id of the current task in the loop is equal to the id attribute that we set on the item. If it is, we use the splice function to delete that from the array

delButton.addEventListener('click', handleDelEvent);

function handleDelEvent(event) {
  console.log(modalItem.alt);

  modalLiItem.remove();
  localSongs.forEach(function(songArrayElement, songArrayIndex) {
    // If the songArrayElement matches the modalLiItem id for our HTML list item
    if (songArrayElement.id == modalLiItem.getAttribute('dataid')) {
      // Splice to remove items from array when we know the index of item in array 
      localSongs.splice(songArrayIndex, 1);
      console.log('removed');
    }
  })

  localStorage.setItem('songs', JSON.stringify(localSongs));
  // Closes modal box when the delete button is clicked
  modal.style.display = 'none';
  console.log(localSongs);
  console.log(modalItem.getAttribute('dataid'))
}

displaySongs();
