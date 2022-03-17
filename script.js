
const { randomQuote, authorQuotes, getQuotes, searchQuotes } = require("quotegarden");

  var currentQuote = "",
  currentAuthor = "",
  currentGenre="";

 function getQuote() {
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
}; 

function getAuthorQuotes(){
  authorQuotes(currentAuthor)
  .then((quote) => {
    console.log(quote);
  })
  .catch((error) => {
    console.log(error);
  });
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
  $('.author-box').on('click', getAuthorQuotes);
});