# Instructions

My Song Mood tracker application allows users to add entries, including their mood and song. After they press 'log entry', users can see their entry be displayed. To view more information about their entry, **users need to click the image within the song entry to open the modal box** with an expanded image, the name of the genre that the user selected, the delete button and the user's description.  

# Documentation of the development process, iterations, and improvements

The development process of creating my tracking application consisted of developing three components one by one and joining them together. The first component was the text section that provided the context of what my application is for. The second component was the user input form that creates a new entry for the user. The third component was the list of song entries, displayed underneath the form. I developed the modal box after the third componenent. I took an iterative approach by making numerous iterations with design modifications and new functionalities, where I tested out these new iterations and implemented these changes, adding new code to the previous iteration. 

I developed the HTML first and designed the first component of my application. I took a step by step approach with each element of my first component, creating classes to control properties like padding, margin, width and height for rectangle boxes and lines. I set the background colour in the HTML. After developing the HTML and CSS, I tested it out to ensure the CSS was aligned with my proposed web app design. This took many iterations that resulted in my final outcome. Initially I made separate lines of paragraph text to control which words go into each line. This worked out fine until I added a media query to make the first component responsive to a mobile screen. The paragraph overlapped and the initial HTML order of paragraph text was a huge inconvenience, where I was in a position of wanting to add more words to each paragraph line for mobile screens. Thus, I changed this to a whole paragraph and adjusted the margin-left, margin-right and line-height to fit the screen accordingly in desktop and mobile display. 

After the first component was developed, I moved onto the second component. I removed the border box around the form as shown in my proposed design as I wanted to establish visual consistency between each component with the presence of the background color linking each component together to evoke that infinite scrolling effect. I used the tasklist form I built for the JS coding challenge assessment (I worked on this code after the assessment was submitted to build my skills in DOM manipulation and event handling). The code for the tasklist form and display of items after the user clicks the submit button had the same functionality of my application. Thus, I used this code as a basis to make the JS process easier. Initially, I positioned the headings, labels, input boxes, and submit button into one column. In order to make the form align with my proposed design for the form, this consisted of a few iterations that included experimenting with the width of boxes and layout to make the form into two columns. This led to using CSS flexbox to display the input boxes and labels into separate rows instead of columns using the flex-display. Additionally, I used the ‘flex-direction: column’ to display the labels on top of the input boxes, as opposed to the initial design of the labels being positioned next to the input boxes on its left.

Throughout the development process, I learnt that the inspect tool is immensely helpful for building the CSS of my components, making it so much easier to modify the sizing of elements for responsive design in the first, second and third component, and the modal popup box. From the inspect tool, I learnt that the CSS Box Model could be edited to test out different margins, borders, padding, and the dimensions of content if you selected certain parts of your screen. This allowed me to quickly add a border around elements and to define spaces between elements like the input boxes in the form. With this tool, I was able to repeat this step over and over again to test out new CSS with the new values informed by the CSS Box Model. 

After the second component was developed, I moved onto the third component. In my proposed design, users could hover on an arrow icon on the song cover image, triggering the text “Expand”. The user would be able to click this arrow button to open the modal popup window. However, I didn't implement this feature as I wanted to keep the user interface design clean and minimalistic without too much text crowding the limited space within the song item. The third component took many iterations to build the proposed design of the display of song items, where the row heading had the mood and the second row heading had the following information. I made another HTML file called item.html to make the format of the song items. After testing out the CSS multiple times, I pasted the HTML into the Javascript, as I could only test the CSS in the item.html and not inside JS. Therefore it was necessary to test the format of the song items before putting it into JS. Inside the inner HTML in JS, I initially put a fixed value of time and genre image before changing it based on user input. There were many lessons learnt in this part of the development process. The event handling was done on JS. I faced many challenges which became lessons I learnt, ultimately building my skill in debugging and variable scope. For the dropdown menu in my genre input box inside the form, I couldn't match the correct option to the allocated genre image. I realized that the event is already gone when the user selects the genre option without pressing the log entry button. Therefore, the inner HTML statement inside the function displaySongs() only happens when you click on the log entry button. To combat this issue, I needed to capture a value to store what has been selected through var selectedImg. By storing this variable, I can put the value in the src of the img when the user presses log entry. As a result, I can use this variable when the user clicks log entry to store into the source. To get the local variable, I had to use placeholders ${} inside the inner HTML. Through doing this, I learnt how to input individual items like song.songName into display. Thus the variable that the user selects is stored as ‘set attribute’ doesn't do anything. Finally, my array of images in JS needs to have a value for each index, established in my HTML for the user input form. For index 0, the option value "select one" has no image, but if the user selects it, I will put a default image to make sure each image corresponds to the selected genre. Thus, index 0 of the array is a default value. This ensures each option the user selects from the genre dropdown menu, matches to its corresponding genre image. This is the best practice I took as an approach to obtaining an image for a song item to be displayed, as it minimized complications without the trouble of getting the song cover image from an API that provides access to a music database to retrieve the song cover image when a user inputs a song's name and artist in my user input form.

Another lesson I learnt was how to debug code. I received an error when trying to pass three values as parameters in the function image(img, songId, descText). By using the console accessed by the inspect tool, I noticed there was a syntax error in my JS that was happening inside the inner HTML. I figured out that I needed to quote the variable value '${song.description}'. Another example of learning from debugging and identifying the issue for improvement was trying to remove items from my local storage. This issue had me stuck for one day, where items that the user added from the form were stored in local storage but were not removed when the user deletes it. On display, the item is removed but once the user refreshes the browser, the removed item comes back and gets displayed again. To fix this issue, I wrote these two logs console.log(“songArrayElement: “ + songArrayElement.id) and console.log(“songArrayElement: “ + modalItem.getAttribute(‘data.id’)). The modalItem console message always returned null so it couldn’t be the right item. Therefore, I figured out that my local storage couldn’t remove items from local storage as I chose the wrong item inside the foreach loop ‘localSongs.forEach(function(songArrayElement, songArrayIndex)’ to remove items. My debugging process consisted of putting console log messages to see the data id and the element id. I fixed this by placing the correct value being modalLiItem, demonstrating the importance of correct naming. Variable scope was a lesson I learnt during the development process, specifically the difference between global and local scope and recognising the impact of the location of a variable, which initially seemed like a tiny thing to me. The variable scope I defined within the function localSongs couldnt be accessed globally. Thus, I moved the declaration outside of functionaddSong so it can become a global variable instead of a local variable. 

For the modal popup box, I used this website https://www.w3schools.com/howto/howto_css_modal_images.asp to help me create a responsive modal box/image in CSS and JS, where I displayed it on top of the current page in the middle. I used their provided code as a basis for the modal background, modal image, text on the modal, animation of the image and text appearing, close button and the labeling of classes and ids. 

# Outline of application configuration and deployment procedures

My tracking application is responsive for both mobile and desktop devices, where I used flexible units like percentages and em to ensure that the application scales appropriately on different screen sizes. For mobile devices, the screen resolution 375 x 667 through 414 × 896 is the best for viewing. For desktop devices, the screen resolution 1920 × 1080 is best for viewing. The best mobile screen dimensions are 6.1 inches when viewing my application. The best desktop screen dimensions are 14 inches when viewing my application. 

To run my web application, you will need to run 'npm install' on your terminal to download the dependencies. After that, write the command 'npm run start' to start the web server. 

# Well-considered recommendations for further improvements or extensions

To conclude my documentation, I will highlight potential areas for improvement and extensions. 

To further the visual engagement of the user interface design, the CSS of the modal box could be augmented with exciting animations and transitions to increase the use of these applications, where you can consider declaring keyframes and using CSS transitions to create lateral changes between states of the modal box. Perhaps the user can toggle between the song image taking the entire area of the modal box and their description entry so it fits the entire modal display area as well. 

I suggest improving performance optimizations to reduce loading times, especially for the modal box and the image showing up in the list of entries. This can be achieved through image optimization, where the genre images can be compressed before uploading them to your local source-code editor. Consider using image formats like WebP, where WebP files are generally smaller than a traditional format like the current genre images’ format JPEG. Additionally, the implementation of lazy loading could defer the loading of genre images that don’t show up on the user’s screen immediately. By implementing these techniques, the loading speed of genre images can be immensely improved in users’ web browsers to create a more efficient user experience. 

Another thing to consider is making the tracking application more personalized for the user with the ability to add the song cover image unique to each song item in their entries list. This can be done by extending the tracker’s capabilities by using an API like the Spotify API to retrieve the song cover image. You can consider retrieving more information like the album name of the song or the duration of the song. By providing these well-considered strategic recommendations, I aim to enable future developers to build upon my existing application and contribute to the continuous improvement and success of my Song Mood tracker application. 

# References (Genre Images)

Dance party cover image for Spotify. (n.d.). RouteNote Blog. Retrieved June 1, 2023, from https://routenote.com/blog/top-10-dance-electronic-playlists/.

Graphic design of Ariana Grande . (n.d.). PopUp. Retrieved June 1, 2023, from https://www.vasava.es/en/portfolio/pop-up.

H.E.R. Spotify cover image. (n.d.). Twitter. Retrieved June 1, 2023, from https://twitter.com/Spotify/status/1234572941104427009.

Rock classics cover image for Spotify. (2021). RouteNote Blog. Retrieved June 1, 2023, from https://routenote.com/blog/top-10-dance-electronic-playlists/.

spotify top 100 hip hop (DRAKE COVER). (n.d.). GoShoppi. Retrieved June 1, 2023, from https://www.tfianobles.top/products.aspx?cname=spotify+top+100+hip+hop&cid=10. 


