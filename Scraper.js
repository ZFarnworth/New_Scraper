const puppeteer = require("puppeteer");
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

//adding extra points to words
var options = {
  extras: {
    'best': 5,
    'incredible':5,
    'love': 5,
    'amazing': 5,
    '😁':5,
    '❤️':15,
    '😍':10,
    '👍':10,
  }
};

let URL = 'https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/'
const pages = ['page2', 'page3', 'page4','page5','page6'];
const allReviewBodies = [];
const reviewsAndScores = [];

Array.prototype.pushArray = function(arr) {
  this.push.apply(this, arr);
};

//function to get reviews from one page

grabReviews = async (URL, PageNumber, allReviewBodies) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      URL + PageNumber
    );

      // Grabbing all review-content from HTML
    const customerReviews = await page.evaluate(() => {
      const reviewsList = document.querySelectorAll('div.valign-top > p.review-content');
      const reviewBodies = [];
      //Looping through nodelist to get review bodies
      for (let i = 0; i < reviewsList.length; i++) {
        let reviewBody = reviewsList.item(i).innerHTML;
        reviewBodies.push(reviewBody);
      }
      return reviewBodies;
    });
      
    await browser.close();
    return customerReviews;
}

//looping through pages to get each page

const getReviewsAllPages = async () => {
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    const customerReviews = await grabReviews(URL, page, allReviewBodies);
    allReviewBodies.pushArray(customerReviews)
  }
  return allReviewBodies;
};



getReviewsAllPages().then(allReviewBodies => {

  //looping throw reviews to assign each review a score
  allReviewBodies.forEach(review => {

    //determining the reviews score 
    var result = sentiment.analyze(review, options);
    reviewScoreObj = {reviewBody: review, Score: result.score};

    reviewsAndScores.push(reviewScoreObj)
    
  });
  // sorting reviews based on their score top to bottom
  reviewsAndScores.sort(function(a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);  
});

//grabbing the top 3 scores
for (let index = 0; index < 3; index++) {
  const top5 = reviewsAndScores[index];
  console.log(top5)
}
})

module.exports = getReviewsAllPages;


