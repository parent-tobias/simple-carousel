/***
 * A Slideshow class.
 *  Initialization options:
 * - images: Array of image URLs
 * - prev: HTML DOM node to which we attach the previous handler
 * - next: HTML DOM node to which we attach the next handler
 * - container: HTML DOM node we'll use for the slideshow itself.
 ***/
class Slideshow {
  constructor({container, images, prev, next, interval}){
    // Set up all the properties of our Slideshow object
    this._counter = 0;
    this._images = images;
    this._container = container;
    this._prev = prev;
    this._next = next;
    this._interval = interval ? interval : 2000;
    this._slides = [];
    // We will maintain an array of slides, and we'll populate that
    //  with image instances. Additionally, we'll add them all to the
    //  container element.
    for (let i=0; i<this._images.length; i++){
      let img = document.createElement("img");
      img.classList.add("slideshow-image");
      img.src = this._images[i];
      this._slides.push(img);
      
      this._container.appendChild(img);
    }
    
    // We want the various handlers (next, prev and animate) to keep
    //  in the Slideshow context, so we'll bind() them to it.
    this._prevBtnHandler = this._prevBtnHandler.bind(this);
    this._nextBtnHandler = this._nextBtnHandler.bind(this);
    this._animate = this._animate.bind(this);
    
    // And we'll attach our prev/next click handlers.
    this._prev.addEventListener("click", this._prevBtnHandler);
    this._next.addEventListener("click", this._nextBtnHandler);
    
    // All that done, we can hide all the slides...
    this._hideSlides();
    // and start the scrolling slideshow.
    this._animate();
  }
  
  // hideSlides iterates over the _slides array, and sets each
  //   to display: none
  _hideSlides(){
    this._slides.forEach(slide => {
      slide.style.display = "none";
    })
  }
  
  // showSlide hides all the slides, and then displays only the
  //  one from _slides with the given index.
  _showSlide(index){
    this._hideSlides();
    this._slides[index].style.display = "block";
  }
  
  // animate, rather than re-inventing the wheel, simply calls
  //  our next handler, then sets itself up to run again at a
  //  given interval.
	_animate() {
    this._nextBtnHandler();
		this._timer = setTimeout(this._animate, this._interval);
	}
  
  // next and previous kill the timer. The reason is, if the user has
  //  clicked the next or prev button, we want to stop the slideshow. If,
  //  instead, we have called this from animate, we'll simply add the timer
  //  right back in over there.
  _nextBtnHandler(){
    if(this._timer){
      clearTimeout(this._timer);
      delete this._timer;
    }
    
    // Now, are we at the end of the array of images? Start from the beginning
    //   or increment the counter, depending.
    this._counter = this._counter+1 >= this._images.length ? 0 : this._counter+1;
    
    // and display the image at the given index.
    this._showSlide(this._counter);
  }
  
  _prevBtnHandler(){
    if(this._timer){
      clearTimeout(this._timer);
      delete this._timer;
    }
    this._counter = this._counter-1 < 0 ? this._images.length-1 : this._counter-1;
    this._showSlide(this._counter);
  }
}

    let mySlideshow = new Slideshow({
      container: document.getElementById("slideshow-container"),
      next: document.getElementById("next"),
      prev: document.getElementById("previous"),
      images: ["https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ],
      interval: 3000
    })