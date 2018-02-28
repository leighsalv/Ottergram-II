var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var LEFT_RIGHT_BUTTONS = "[data-image-button=\"button\"]";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

// get image url
function imageFromThumb(thumbnail) {
  "user strict";
  return thumbnail.getAttribute("data-image-url");
}
// get image title
function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  var img = imageFromThumb(thumbnail);
  var title = titleFromThumb(thumbnail);
  setDetails(img, title);
}

// adds click listener to thumbnails
function addThumbClickedHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

// gathers all images into thumbnail array
function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

// left and right buttons for detailed image - works even if user clicks on thumbnail
function leftRightButtons() {
  "use strict";
  var getCurrTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  var buttons = document.querySelectorAll(LEFT_RIGHT_BUTTONS);
  var buttonsArr = [].slice.call(buttons);
  var leftButton = buttonsArr[0];
  var rightButton = buttonsArr[1];
  var thumbnailsArr = getThumbnailsArray();
  var currImage;
  var currTitle;

  //left button
  leftButton.addEventListener("click", function(event) {
    event.preventDefault();

    for (var i = 0; i < thumbnailsArr.length; i++) {
      if (thumbnailsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
        if (i == 0) {
          currImage = imageFromThumb(thumbnailsArr[thumbnailsArr.length - 1]);
          currTitle = titleFromThumb(thumbnailsArr[thumbnailsArr.length - 1]);
          setDetails(currImage, currTitle);
          break;
        } else if (i != 0) {
          currImage = imageFromThumb(thumbnailsArr[i - 1]);
          currTitle = titleFromThumb(thumbnailsArr[i - 1]);
          setDetails(currImage, currTitle);
        }
      }
    }

  });

  //right button
  rightButton.addEventListener("click", function(event) {
    event.preventDefault();

    for (var i = 0; i < thumbnailsArr.length; i++) {
      if (thumbnailsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
        if (i == thumbnailsArr.length - 1) {
          currImage = imageFromThumb(thumbnailsArr[0]);
          currTitle = titleFromThumb(thumbnailsArr[0]);
          setDetails(currImage, currTitle);
        } else {
          currImage = imageFromThumb(thumbnailsArr[i + 1]);
          currTitle = titleFromThumb(thumbnailsArr[i + 1]);
          setDetails(currImage, currTitle);
          break;
        }
      }
    }
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickedHandler);
  leftRightButtons();
}

initializeEvents();
