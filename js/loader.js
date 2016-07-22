(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();



var handlerKeyDown = function(e) {
            input.onKeyDown(e);
        }
var handlerKeyUp = function(e) {
            input.onKeyUp(e);
        }

var handlerMouseMove = function(e){
        input.mouseMove(e);
}
var handlerMouseDown = function(e){
    input.mouseDown(e);
}
var handlerMouseUp = function(e){
    input.mouseUp(e);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var c=0; c < sources.length; c++)
        {
          tmp = sources[c];
          images[tmp.name] = new Image();
          images[tmp.name].onload = function() {
          //  if(++loadedImages >= numImages) {
              callback(images);
          //  }
          };
          images[tmp.name].name = tmp.name;
          images[tmp.name].src = tmp.src;
        }
}

function getImage(name){
 // console.log(library.loadImages);
  for(var c=0; c < library.loadImages.length; c++)
  {
        if(library.loadImages[c].name == 'char1')
            return library.loadImages[c];
  }
  return false;
}
