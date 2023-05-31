const form = document.getElementById('songform');
const songlistElem = document.querySelector('#songs');

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

function displaySong(song) {
  let item = document.createElement('li');
  item.setAttribute('data-id', song.id);
  item.innerHTML = 
    `<div class="item">
      <div class="item-mood-row">
          ${song.mood}
      </div>
      <div class="item-song-row">
          <div class="item-image">
              <img id="myImg" src="image1.jpg" alt='${song.description}' width="40" height="40" onclick="image(this)">
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

// Create an array called 'taskList'
var songList = [];

// Create a function called 'addTask'
// Give the function input parameters for: name, type, rate, time, client
// Paste your object definition from above in the function
// Replace the property values with the input paramaters
// Add the object to the taskList array

function addSong(songName, artist, genre, mood, description) {

  // Creating the object, directly passing in the input parameters
  let song = {
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

/*
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
*/

function image(img) {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
