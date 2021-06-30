const getReviewsAllPages = require('./getReviewsAllPages');

test('Checks that we got the nodelist after scraping', () => {
    const getReviews = new getReviewsAllPages();
  
    expect(getReviews).toBe(expect.any(String));
  });


