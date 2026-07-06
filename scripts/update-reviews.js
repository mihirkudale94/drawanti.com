/* eslint-disable */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Your Google Maps Link
const url = 'https://maps.app.goo.gl/mpnsDGMq8bSq3bXq8';

(async () => {
  console.log('Starting open-source static scraper...');
  console.log('Launching headless browser...');
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set language to English to ensure consistent scraping
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.log('Waiting for page to load and redirect...');
  await new Promise(r => setTimeout(r, 5000));

  console.log('Attempting to find the "Reviews" tab and click it...');
  try {
    // Look for tabs by role or text
    const tabs = await page.$$('button[role="tab"]');
    for (let tab of tabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text && text.includes('Reviews')) {
        await tab.click();
        console.log('Clicked Reviews tab. Waiting for reviews to load...');
        await new Promise(r => setTimeout(r, 3000));
        break;
      }
    }
  } catch (e) {
    console.log('Could not automatically click reviews tab. The page might already show them or layout changed.');
  }

  console.log('Extracting reviews from DOM...');
  let reviews = await page.evaluate(() => {
    const results = [];
    
    // .jftiEf is historically the main container for a Google Maps review item
    const reviewElements = document.querySelectorAll('.jftiEf'); 
    
    // Try to find ANY text that looks like a review.
    // If not, let's dump the HTML for debugging.
    return document.body.innerHTML;
  });

  if (typeof reviews === 'string') {
    fs.writeFileSync('debug.html', reviews);
    console.log('Saved debug.html');
    reviews = [];
  }


  if (reviews.length > 0) {
    console.log(`✅ Successfully scraped ${reviews.length} reviews!`);
    const dataPath = path.join(__dirname, '../data/reviews.json');
    
    // We append/merge with existing reviews so we don't lose old ones if they scroll off screen
    let existingReviews = [];
    try {
      if (fs.existsSync(dataPath)) {
        existingReviews = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
    } catch(e) {}

    // Merge and remove exact duplicates based on author and text
    const allReviews = [...reviews, ...existingReviews];
    const uniqueReviews = Array.from(new Set(allReviews.map(a => a.author_name + '|' + a.text)))
      .map(id => {
        return allReviews.find(a => a.author_name + '|' + a.text === id);
      });

    fs.writeFileSync(dataPath, JSON.stringify(uniqueReviews, null, 2));
    console.log(`Saved a total of ${uniqueReviews.length} unique reviews to data/reviews.json`);
  } else {
    console.log('⚠️ No reviews could be scraped this time.');
    console.log('Google often changes their HTML classes (.jftiEf, .wiI7pd, etc.) to block scrapers.');
    console.log('If this happens constantly, you can manually update data/reviews.json with your best reviews.');
  }

  await browser.close();
  console.log('Scraping finished.');
})();
