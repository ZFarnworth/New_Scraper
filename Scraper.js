const puppeteer = require("puppeteer");
var Sentiment = require('sentiment');
var sentiment = new Sentiment();


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

// loop through the review bodys
// for review in reviewBody 
// determine the score
// get the score, and then return a list of something like this {reviewBody: "this is a review body", score: 10}
// a list of objects that look like this ^
// sort on score

getReviewsAllPages().then(allReviewBodies => {
  // console.log(allReviewBodies, 'now????');

  allReviewBodies.forEach(review => {
    var result = sentiment.analyze(review);
    reviewScoreObj = {reviewBody: review, Score: result.score};

    reviewsAndScores.push(reviewScoreObj)
    
  });
  // console.log(reviewsAndScores);
  reviewsAndScores.sort(function(a, b) {
    return parseFloat(b.Score) - parseFloat(a.Score);  
});
for (let index = 0; index < 5; index++) {
  const top5 = reviewsAndScores[index];
  console.log(top5)
}
})



