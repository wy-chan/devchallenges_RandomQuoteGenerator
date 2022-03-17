
const { randomQuote, authorQuotes, getQuotes, searchQuotes } = require("quotegarden");

  var currentQuote = "",
  currentAuthor = "",
  currentGenre="";

 function getQuote() {
  $("#main-box-list").empty();
  randomQuote()
  .then((quote) => {
    console.log(quote);
    currentQuote = quote.data[0].quoteText;
    currentAuthor = quote.data[0].quoteAuthor;
    currentGenre = quote.data[0].quoteGenre;
    $('#text').text(currentQuote);
    $('.author').text(currentAuthor);
    $('#genre').text(currentGenre);
  })
  .catch((error) => {
    console.log(error);
  });
  hideQuotes();
}; 

function getAuthorQuotes(){
  authorQuotes(currentAuthor)
  .then((quote) => {
    console.log(quote.data);
    quote.data.map(d => getQuoteList(d))
  })
  .catch((error) => {
    console.log(error);
  });
  hideQuote();
}


function hideQuote(){
  $('#main-box').addClass('hidden');
  $('#author-title').removeClass('hidden');
}

function hideQuotes(){
  $('#main-box').removeClass('hidden');
  $('#author-title').addClass('hidden');
}


function getQuoteList(d){
  const quoteContainer = document.createElement("div");
  quoteContainer.classList.add("quote-container");
  const quoteBox = document.createElement("div");
  quoteBox.classList.add("quote-box");
  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = d.quoteText;

  quoteBox.appendChild(text);
  quoteContainer.appendChild(quoteBox);
  $('#main-box-list').append(quoteContainer);
}

$(document).ready(function () {
  randomQuote()
  .then((quote) => {
    console.log(quote);
    currentQuote = quote.data[0].quoteText;
    currentAuthor = quote.data[0].quoteAuthor;
    currentGenre = quote.data[0].quoteGenre;
    $('#text').text(currentQuote);
    $('.author').text(currentAuthor);
    $('#genre').text(currentGenre);
  })
  .catch((error) => {
    console.log(error);
  });
  $('#random-button').on('click', getQuote);
  $('#author-box').on('click', getAuthorQuotes);
});