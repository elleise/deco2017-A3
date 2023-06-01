// Setting up variables for HTML elements using DOM selection, including form element and song list elements under form
const form = document.getElementById('songform');
const songlistElem = document.querySelector('#songs');

//  event after log entry button 
//  add song will add all values including id
//  push into songlist and call displaySong

form.addEventListener('submit', function(event){
  // Block the default submission behaviour
  event.preventDefault();
  /*Do something*/
  addSong(
    form.elements.songName.value,
    form.elements.artist.value, 
    form.elements.genre.value,
    form.elements.mood.value,
    form.elements.description.value
  );
})

// data id is the date, create class for li - allows me to search up all the li items for last step to remove record
// 7 blocks from list item inide one div to remove an item. you need to find the li through its id set by setattribute, where we set the song.id to the dataid

function displaySong(song) {
  let item = document.createElement('li');
  item.setAttribute('dataid', song.id);
  item.className = "songs-li";
  item.innerHTML = 
    `<div class="item">
      <div class="item-mood-row">
          ${song.mood}
      </div>
      <div class="item-song-row">
          <div class="item-image">
              <img id="myImg" src="image1.jpg" alt='${song.description}' width="40" height="40" onclick="image(this, ${song.id})">
          </div>
          <div class="item-song-name">
              <b>${song.songName}</b> <br> ${song.artist}
          </div>
          <div class="item-created-time">
              FEB 16, 2023 - 6:00PM
          </div>
      </div>
    </div> `;

  songlistElem.appendChild(item);
  form.reset();
}

// song.id displays image
// Create an array called 'taskList'
var songList = [];

function addSong(songName, artist, genre, mood, description) {

  // Creating the object, directly passing in the input parameters
  let song = {
    id: Date.now(),
    songName,
    artist,
    genre,
    mood,
    description
  };

  songList.push(song);
  displaySong(song);
}

// Call the function with test values for the input paramaters
addSong("Working", "Sam Hui", "Genre", "Relaxed", "Relaxed song from Sam");

// Log the array to the console.
console.log(songList);

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var delButton = document.getElementsByClassName("del-button")[0];
var modalItem = null;
var modalLiItem = null;

// block summons screen, src loads the image , img.alt displays description, find out which li item has the song item
// when you clickl delete, this findLiElementById tells me which modal box correponds to a specific song item 

function image(img, songId) {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
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
console.log(songList);


delButton.addEventListener('click', handleDelEvent);

function handleDelEvent(event) {
  console.log(songList);
  console.log(modalItem.alt);
  
  modalLiItem.remove();
  songList.forEach(function(songArrayElement, songArrayIndex){
    if (songArrayElement.id == modalItem.getAttribute('dataid')) {
      songList.splice(songArrayIndex, 1);
    }
  })

  console.log(songList);
}