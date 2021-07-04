let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 10000); // Change image every 5s
}

function currentSlide(numSlide)
{
  let slides = document.getElementsByClassName("mySlides");
  let i;
  for(i=0; i<slides.length; i++)
  {
    if(i==(numSlide - 1))
      slides[i].style.display = "block";
    else
      slides[i].style.display = "none";
  }
}

function plusSlides(number)
{
  let slides = document.getElementsByClassName("mySlides");
  if(number>0)
  {
    if(slideIndex==slides.length - 1)
      slideIndex = 0;
    else
      slideIndex++;
  }
  else
  {
    if(slideIndex==0)
      slideIndex = slides.length - 1;
    else
      slideIndex--;
  }
  for(let i=0; i<slides.length; i++)
  {
    if(i != slideIndex)
      slides[i].style.display = "none";
    else
      slides[i].style.display = "block";
  }
}