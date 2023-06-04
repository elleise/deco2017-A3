// Setting up variables for HTML elements using DOM selection, including form element and song list elements under form
const form = document.getElementById('songform');
const songlistElem = document.querySelector('#songs');

// const selectGenre = document.querySelector('select')
// const img = document.querySelector('img')
// const genre = ["./genreImages/Electronic dance music.jpeg", "./genreImages/Hip hop.jpeg", "./genreImages/Pop music.jpeg", "./genreImages/RNB.jpeg", "./genreImages/Rock.jpeg"]

const selectGenre = document.querySelector('select')
const img = document.querySelector('img')
const genre = ["./genreImages/Electronic dance music.jpeg", "./genreImages/RNB.jpeg", "./genreImages/Pop music.jpeg", "./genreImages/Hip hop.jpeg", "./genreImages/Electronic dance music.jpeg", "./genreImages/Rock.jpeg"]

// console.log(genreImageMapping);
// selectGenre.addEventListener('change', () =>  {
//   img.setAttribute('src', genre[selectGenre.selectedIndex])
// })
var selectedImg = "./genreImages/Electronic dance music.jpeg";
selectGenre.addEventListener('change', () => {
  selectedImg = genre[selectGenre.selectedIndex];
  console.log(selectedImg);
})

//listening out for submission event on the form itself
form.addEventListener('submit', function(event) {
  // Block the default submission behaviour
  event.preventDefault();
  //all values below come from the form
  addSong(
    form.elements.songName.value,
    form.elements.artist.value,
    form.elements.genre.value,
    form.elements.mood.value,
    form.elements.description.value
  );
})

//taking song items object and creating a new list item element, setting the attribute for the element
function displaySongs() {
  //work out if songs need to be displayed on the page
  songlistElem.innerHTML = "";
  let localSongs = JSON.parse(localStorage.getItem('songs'));
  console.log("list local songs");
  console.log(localSongs);

  //check to see if localSongs element is empty
  if (localSongs !== null) {

    //forEach loop to go through the array we stored as localSongs variable
    localSongs.forEach((song) => {

      let item = document.createElement('li');
      item.setAttribute('dataid', song.id);
      item.className = "songs-li";
      //innerHTML is used to format how song list items are displayed
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

      //appends that item to the songlistElem established in line 3
      songlistElem.appendChild(item);
      form.reset();

    }) //Closing brackets for forLoop
  } // Closing bracket for if statement
}

//This array for song items added is no longer needed as I have the localSong array, reducing the complexity of my code
// var songList = [];

var localSongs = JSON.parse(localStorage.getItem('songs'));

//variable attached to song that is created, each value is unique happening at current time

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

  // Format the date and time
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

  //checks local storage if an item/items exists
  //fetch and parse localStorage value, i
  localSongs = JSON.parse(localStorage.getItem('songs'));

  //check whether variable localSongs is empty (null) or contains a value

  //if there are no items in local storage
  if (localSongs == null) {
    localSongs = [song];
  } else {
    // check to see if there is an existing item with the same properties
    if (localSongs.find(element => element.id === song.id)) {
      console.log('Task id already exists');
    } else {
      localSongs.push(song);
    }
  }

  //pushes objects into empty array above songList
  //no need to push into songList after it's pushed into localSongs
  // songList.push(song);

  //set this new item localSongs in our localStorage object
  localStorage.setItem('songs', JSON.stringify(localSongs))
  //call displayTask after the object is pushed 
  displaySongs();
}

// Call the function with test values for the input paramaters
//addSong("Working", "Sam Hui", "Genre", "Relaxed", "Relaxed song from Sam");

// Log the array to the console.
// console.log(songList);

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById("myImg");
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
    if (songArrayElement.id == modalLiItem.getAttribute('dataid')) {
      localSongs.splice(songArrayIndex, 1);
      console.log('removed');
    }
  })

  localStorage.setItem('songs', JSON.stringify(localSongs));
  //closes modal box when the delete button is clicked
  modal.style.display = 'none';
  console.log(localSongs);
  console.log(modalItem.getAttribute('dataid'))
}

displaySongs();
