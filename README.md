# Overly Positive Scraper

## Description

A scraper script finds overly positive endorsemesnt and ranks them to find the most "over-the-top" reviews and uncover the top three worst offenders of overly positive endorsements.


## Installation

1. Node (https://nodejs.org/en/download/);
2. npm Puppeteer (https://www.npmjs.com/package/puppeteer);
3. npm Sentiment (https://www.npmjs.com/package/sentiment)
4. npm Jest (https://www.npmjs.com/package/jest)

## Usage

In the terminal or commandline, Navigate to the directory and run 'npm install' for all dependencies. 

Then run 'Node Scraper.js' to run the script. 

Run 'npm run test' in order to run tests using jest. 

## General-Info

The criteria used to determine which reviews are "overly-positive" is a score based on the number of positive and negative words used in the review. 

This list contains which words are positive and which are negative. https://github.com/thinkroth/Sentimental/blob/master/wordLists/afinn.json

Along with these words, extra points have been added to words and emojis that are considered overly-positive. 

Listed below are the items that have recieved extra points

'best': 5,
    'incredible':5,
    'love': 5,
    'amazing': 5,
    '😁':5,
    '❤️':15,
    '😍':10,
    '👍':10,
  }




