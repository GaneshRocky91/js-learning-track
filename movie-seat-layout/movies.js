const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');

populateUI();

let ticketPrice=parseInt(movieSelect.value);
//console.log(typeof(ticketPrice));

//save selected mvie index and price
function setMovieData(movieIndex,moviePrice)
{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

//update total and count
function updateSelectedCount()
{
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);

    /* copy selectedSeats into an array then map through an array and return a new array of indexes */
    const seatsIndex=[...selectedSeats].map((seat)=>
        [...seats].indexOf(seat));
        //return [...seats].indexOf(seat)


    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));


    // console.log(seatsIndex);
    const selectedSeatsCount=selectedSeats.length;
    //console.log(selectedSeatsCount);
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
}

//get data from local storage and populateUI
function populateUI()
{
const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
if(selectedSeats!==null&&selectedSeats.length>0)
{
seats.forEach((seat,index)=>
{
    if(selectedSeats.indexOf(index)>-1)
    {
seat.classList.add('selected');
    }
});
}
const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
if(selectedMovieIndex!==null)
{
movieSelect.selectedIndex=selectedMovieIndex;
}
//console.log(selectedSeats);
}
//Movie select
movieSelect.addEventListener('change',e=>
{
    ticketPrice=parseInt(e.target.value);
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
});

//Seat click event
container.addEventListener('click',(e)=>
{
    //console.log(e.target);
    if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied'))
    {
        //console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount()
    }
});

//initial count and total
updateSelectedCount(); 
