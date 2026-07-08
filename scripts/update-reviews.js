/* eslint-disable */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Google My Business Profile Redirect Link
const url = 'https://share.google/opMeC2c62E8WG3uPX';
const placeId = 'ChIJaXUk4ui_wjsRoD_dRkCDtwA';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Dr%20Awanti%20Dhadphale&query_place_id=${placeId}`;
const expectedReviewCount = 25;

function getReviewKey(review) {
  return review.review_id ||
    [
      review.author_name || '',
      review.rating || '',
      review.text || '',
      review.relative_time_description || ''
    ].join('|');
}

function getReviewContentKey(review) {
  const author = (review.author_name || '').trim().toLowerCase();
  const rating = review.rating || '';
  const relativeTime = (review.relative_time_description || '').trim().toLowerCase();

  if (author && relativeTime) {
    return [author, rating, relativeTime].join('|');
  }

  return [
    author,
    rating,
    (review.text || '').replace(/\s+/g, ' ').trim().toLowerCase(),
    relativeTime
  ].join('|');
}

function mergeReviewRecords(preferredReview, fallbackReview) {
  const preferredText = preferredReview.text || '';
  const fallbackText = fallbackReview.text || '';
  const richerReview = preferredText.length >= fallbackText.length ? preferredReview : fallbackReview;
  const otherReview = richerReview === preferredReview ? fallbackReview : preferredReview;

  return {
    ...otherReview,
    ...richerReview,
    review_id: preferredReview.review_id || fallbackReview.review_id || '',
    profile_photo_url: preferredReview.profile_photo_url || fallbackReview.profile_photo_url || '',
    relative_time_description: preferredReview.relative_time_description || fallbackReview.relative_time_description || ''
  };
}

function dedupeReviews(reviews) {
  const byContent = new Map();
  reviews.forEach(review => {
    const key = getReviewContentKey(review);
    const existingReview = byContent.get(key);
    byContent.set(key, existingReview ? mergeReviewRecords(review, existingReview) : review);
  });

  return Array.from(new Map(
    Array.from(byContent.values()).map(review => [getReviewKey(review), review])
  ).values());
}

(async () => {
  console.log('Starting Google My Business reviews scraper...');
  console.log('Launching browser (headless: false to bypass captchas)...');
  
  // We use headless: false so the browser window is visible.
  // This allows the user to solve captchas if triggered by Google.
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--window-size=1200,900'
    ]
  });
  
  const page = await browser.newPage();
  
  // Set language to English to ensure consistent scraping
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  async function isGoogleCaptchaPage() {
    try {
      return page.url().includes('sorry/index') ||
        (await page.evaluate(() => document.body.innerText.includes('unusual traffic')));
    } catch (error) {
      if (String(error?.message || error).includes('Execution context was destroyed')) {
        await new Promise(r => setTimeout(r, 1000));
        return true;
      }
      throw error;
    }
  }

  // Polling check to wait if captcha is present
  let captchaLogged = false;
  while (await isGoogleCaptchaPage()) {
    if (!captchaLogged) {
      console.log('⚠️ Google Captcha detected! Please solve it in the opened browser window to continue...');
      captchaLogged = true;
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  
  if (captchaLogged) {
    console.log('✅ Captcha solved! Resuming scraping...');
    await new Promise(r => setTimeout(r, 3000)); // Allow redirect to complete
  } else {
    console.log('No captcha detected. Proceeding...');
    await new Promise(r => setTimeout(r, 5000)); // Wait for redirects to stabilize
  }

  console.log('Current URL:', page.url());

  // Wait for page body to load
  await page.waitForSelector('body', { timeout: 30000 });

  console.log('Attempting to find and click the Google Reviews link...');
  let clickedReviews = false;

  async function clickByVisibleText(patterns) {
    return page.evaluate((textPatterns) => {
      const elements = Array.from(document.querySelectorAll('a, button, div[role="button"], span[role="button"]'));
      for (const el of elements) {
        const text = (el.textContent || '').trim();
        if (!text) continue;

        const matches = textPatterns.some((pattern) => new RegExp(pattern, 'i').test(text));
        if (!matches) continue;

        let clickable = el;
        while (
          clickable &&
          clickable.tagName !== 'A' &&
          clickable.tagName !== 'BUTTON' &&
          clickable.getAttribute('role') !== 'button' &&
          clickable.tagName !== 'BODY'
        ) {
          clickable = clickable.parentElement;
        }

        if (clickable && clickable.tagName !== 'BODY') {
          clickable.click();
          return true;
        }

        el.click();
        return true;
      }
      return false;
    }, patterns);
  }

  async function scrapeMapsReviews() {
    console.log(`Opening Google Maps reviews source: ${mapsUrl}`);
    await page.goto(mapsUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('body', { timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));

    const clickedReviewsTab = await clickByVisibleText([
      '^Reviews$',
      '^\\d+\\s+reviews$',
      '^\\d+\\s+Google\\s+reviews$'
    ]);

    if (clickedReviewsTab) {
      console.log('Opened Google Maps reviews tab. Waiting for review cards...');
      await new Promise(r => setTimeout(r, 5000));
    } else {
      console.log('Could not find a Maps reviews tab; trying to scrape current Maps pane.');
    }

    async function expandVisibleMapsReviews() {
      await page.evaluate(async () => {
      for (let pass = 0; pass < 4; pass++) {
        const buttons = Array.from(document.querySelectorAll('button'));
        for (const button of buttons) {
          const label = button.getAttribute('aria-label') || button.textContent || '';
          if (/more|read more/i.test(label)) {
            try {
              button.click();
            } catch (e) {}
          }
        }
        await new Promise(r => setTimeout(r, 500));
      }
    });
    }

    async function scrollMapsReviewsFeed() {
      await page.evaluate(async (targetCount) => {
        function findScroller() {
          const firstCard = document.querySelector('.jftiEf, [data-review-id]');
          let current = firstCard ? firstCard.parentElement : null;
          while (current && current !== document.body) {
            const style = window.getComputedStyle(current);
            if (/(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight + 200) {
              return current;
            }
            current = current.parentElement;
          }

          const feed = document.querySelector('div[role="feed"]');
          if (feed && feed.scrollHeight > feed.clientHeight) {
            return feed;
          }

          const candidates = Array.from(document.querySelectorAll('div'));
          return candidates
            .filter((el) => {
              const style = window.getComputedStyle(el);
              return /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 200;
            })
            .sort((a, b) => b.scrollHeight - a.scrollHeight)[0] || document.scrollingElement;
        }

        const scroller = findScroller();
        let stablePasses = 0;
        let previousCount = 0;

        for (let i = 0; i < 90; i++) {
          scroller.scrollTop = scroller.scrollHeight;
          scroller.dispatchEvent(new WheelEvent('wheel', { deltaY: 900, bubbles: true }));
          scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
          await new Promise(r => setTimeout(r, 1200));

          const count = document.querySelectorAll('.jftiEf, [data-review-id]').length;
          if (count >= targetCount) break;
          if (count === previousCount) {
            stablePasses += 1;
          } else {
            stablePasses = 0;
            previousCount = count;
          }
          if (stablePasses >= 16 && count > 0) break;
        }
      }, expectedReviewCount);
    }

    async function collectVisibleMapsReviews() {
      await expandVisibleMapsReviews();
      const mapsReviews = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.jftiEf, [data-review-id]'));

        return cards.map((card) => {
          const review_id = card.getAttribute('data-review-id') || '';
          const authorEl = card.querySelector('.d4r55, .TSUbDb, .fontBodyMedium');
          const textEl = card.querySelector('.wiI7pd, .MyEned, .Jtu6CA');
          const ratingEl = card.querySelector('[aria-label*="star"], [aria-label*="Rated"]');
          const imageEl = card.querySelector('img');
          const timeEl = card.querySelector('.rsqaWe');

          const author_name = authorEl ? authorEl.textContent.trim() : '';
          const text = textEl ? textEl.textContent.trim().replace(/\s+/g, ' ') : '';
          const ratingLabel = ratingEl ? (ratingEl.getAttribute('aria-label') || '') : '';
          const ratingMatch = ratingLabel.match(/([1-5])(?:\.0)?\s*(?:star|out of)/i) || ratingLabel.match(/([1-5])\/5/);
          const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;
          const profile_photo_url = imageEl ? imageEl.src : '';

          return {
            review_id,
            author_name,
            profile_photo_url,
            rating,
            text,
            relative_time_description: timeEl ? timeEl.textContent.trim() : '',
            time: Math.floor(Date.now() / 1000)
          };
        }).filter((review) => review.author_name);
      });

      return dedupeReviews(mapsReviews);
    }

    async function selectMapsSort(sortLabel) {
      const openedSortMenu = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, div[role="button"]'));
        const button = buttons.find((el) => {
          const text = (el.textContent || '').trim();
          const label = el.getAttribute('aria-label') || '';
          return /sort/i.test(text) || /sort/i.test(label) || /most relevant|newest|highest|lowest/i.test(text);
        });

        if (button) {
          button.click();
          return true;
        }

        return false;
      });

      if (!openedSortMenu) {
        return false;
      }

      await new Promise(r => setTimeout(r, 1000));

      const selected = await page.evaluate((labelPattern) => {
        const pattern = new RegExp(labelPattern, 'i');
        const options = Array.from(document.querySelectorAll('div[role="menuitemradio"], div[role="option"], div[role="menuitem"], button'));
        const option = options.find((el) => pattern.test((el.textContent || '').trim()) || pattern.test(el.getAttribute('aria-label') || ''));
        if (option) {
          option.click();
          return true;
        }
        return false;
      }, sortLabel);

      if (selected) {
        await new Promise(r => setTimeout(r, 3500));
      }

      return selected;
    }

    const allMapsReviews = [];
    const sortPasses = [
      { label: 'Most relevant', pattern: 'Most relevant' },
      { label: 'Newest', pattern: 'Newest' },
      { label: 'Highest', pattern: 'Highest' },
      { label: 'Lowest', pattern: 'Lowest' }
    ];

    for (const sortPass of sortPasses) {
      console.log(`Collecting Google Maps reviews sorted by ${sortPass.label}...`);
      if (sortPass.label !== 'Most relevant') {
        await selectMapsSort(sortPass.pattern);
      }
      await scrollMapsReviewsFeed();
      const passReviews = await collectVisibleMapsReviews();
      allMapsReviews.push(...passReviews);
      console.log(`${sortPass.label} pass parsed: ${passReviews.length}; combined unique: ${dedupeReviews(allMapsReviews).length}`);

      if (dedupeReviews(allMapsReviews).length >= expectedReviewCount) {
        break;
      }
    }

    const uniqueMapsReviews = dedupeReviews(allMapsReviews);
    console.log(`Google Maps review cards parsed: ${uniqueMapsReviews.length}`);
    return uniqueMapsReviews;
  }

  async function scrollSearchReviewsPanel() {
    async function getScrollerBox() {
      return page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        const scope = dialog || document;
        const candidates = Array.from(scope.querySelectorAll('div'));
        const scroller = candidates
          .filter((el) => {
            const style = window.getComputedStyle(el);
            return /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 150;
          })
          .sort((a, b) => b.scrollHeight - a.scrollHeight)[0] || document.scrollingElement;

        const rect = scroller.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + Math.min(rect.height / 2, 500),
          top: scroller.scrollTop,
          height: scroller.scrollHeight
        };
      });
    }

    const firstBox = await getScrollerBox();
    await page.mouse.move(firstBox.x, firstBox.y);

    for (let i = 0; i < 45; i++) {
      await page.mouse.wheel({ deltaY: 900 });
      await new Promise(r => setTimeout(r, 650));
    }

    await page.evaluate(async () => {
      const dialog = document.querySelector('div[role="dialog"]');
      const scope = dialog || document;
      const candidates = Array.from(scope.querySelectorAll('div'));
      const scrollers = candidates
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 150;
        })
        .sort((a, b) => b.scrollHeight - a.scrollHeight);

      for (const scroller of scrollers.slice(0, 4)) {
        for (let i = 0; i < 20; i++) {
          scroller.scrollTop = scroller.scrollHeight;
          scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
          await new Promise(r => setTimeout(r, 400));
        }
      }
    });
  }

  async function collectSearchPanelReviews() {
    console.log('Collecting reviews from Google Search panel...');
    async function selectSearchSort(sortLabel) {
      const selected = await page.evaluate((labelPattern) => {
        const pattern = new RegExp(`^${labelPattern}$`, 'i');
        const controls = Array.from(document.querySelectorAll('button, div[role="button"], span, a'));
        const control = controls.find((el) => pattern.test((el.textContent || '').trim()));
        if (control) {
          control.click();
          return true;
        }
        return false;
      }, sortLabel);

      if (selected) {
        await new Promise(r => setTimeout(r, 2500));
      }

      return selected;
    }

    async function parseCurrentSearchPanel() {
      await scrollSearchReviewsPanel();
      return page.evaluate(() => {
      function parseReviewsFromVisibleText() {
        const lines = (document.body.innerText || '')
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean);

        const start = lines.findIndex(line => /^Most relevant$/i.test(line));
        const panelLines = start >= 0 ? lines.slice(start + 1) : lines;
        const reviews = [];

        function isMetaLine(line) {
          return /^(?:Local Guide)?(?:\s*·?\s*)?\d+\s+reviews?/i.test(line) ||
            /photos?/i.test(line) ||
            /^Local Guide/i.test(line);
        }

        function isTimeLine(line) {
          return /(?:second|minute|hour|day|week|month|year)s?\s+ago$/i.test(line) ||
            /^an\s+hour\s+ago$/i.test(line);
        }

        function isOwnerLine(line) {
          return /Dr\s+Awanti\s+Dhadphale\s+\(owner\)/i.test(line);
        }

        for (let i = 0; i < panelLines.length - 2; i++) {
          const author = panelLines[i];
          const meta = panelLines[i + 1];
          const relativeTime = panelLines[i + 2];

          if (!author || !isMetaLine(meta) || !isTimeLine(relativeTime)) {
            continue;
          }

          const textLines = [];
          let j = i + 3;
          while (j < panelLines.length) {
            const line = panelLines[j];
            const next = panelLines[j + 1] || '';
            const nextAfter = panelLines[j + 2] || '';

            if (/^Hover to react$/i.test(line)) {
              j += 1;
              break;
            }

            if (isOwnerLine(line)) {
              break;
            }

            if (next && nextAfter && isMetaLine(next) && isTimeLine(nextAfter)) {
              break;
            }

            if (!/^More$/i.test(line)) {
              textLines.push(line);
            }
            j += 1;
          }

          reviews.push({
            review_id: '',
            author_name: author,
            profile_photo_url: '',
            rating: 5,
            text: textLines.join(' ').replace(/\s*…More$/i, '').trim(),
            relative_time_description: relativeTime,
            time: Math.floor(Date.now() / 1000)
          });

          i = Math.max(i, j - 1);
        }

        return reviews;
      }

      function getCardCandidates() {
        const directCards = Array.from(document.querySelectorAll('.gws-localreviews__google-review, .WMxUBd, [data-review-id]'));
        const ratingCards = Array.from(document.querySelectorAll('[aria-label*="star"], [aria-label*="Rated"]'))
          .map((ratingEl) => {
            let current = ratingEl;
            for (let depth = 0; current && depth < 8; depth++) {
              const hasImage = current.querySelector && current.querySelector('img');
              const hasName = current.querySelector && current.querySelector('.TSUbDb, .d4r55, .fontBodyMedium, .jxjCjc');
              const textLength = (current.textContent || '').trim().length;
              if (hasImage && hasName && textLength < 2500) {
                return current;
              }
              current = current.parentElement;
            }
            return null;
          })
          .filter(Boolean);

        return Array.from(new Set([...directCards, ...ratingCards]));
      }

      function cleanAuthor(author) {
        return (author || '')
          .replace(/\s+Local Guide.*$/i, '')
          .replace(/\s+\d+\s+reviews?.*$/i, '')
          .trim();
      }

      const domReviews = getCardCandidates().map((card) => {
        const authorEl = card.querySelector('.TSUbDb, .d4r55, .jxjCjc, .fontBodyMedium');
        const textEl = card.querySelector('.Jtu6CA, .wiI7pd, .MyEned, [jsname="bN97Pc"], [class*="review-full-text"]');
        const ratingEl = card.querySelector('[aria-label*="star"], [aria-label*="Rated"]');
        const imageEl = card.querySelector('img');
        const timeEl = card.querySelector('.dehysf, .rsqaWe, .PuaHbe');

        const author_name = cleanAuthor(authorEl ? authorEl.textContent : '');
        const text = textEl ? textEl.textContent.trim().replace(/\s+/g, ' ').replace(/\s*More$/i, '') : '';
        const ratingLabel = ratingEl ? (ratingEl.getAttribute('aria-label') || '') : '';
        const ratingMatch = ratingLabel.match(/([1-5])(?:\.0)?\s*(?:star|out of)/i) || ratingLabel.match(/([1-5])\/5/);
        const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;

        return {
          review_id: card.getAttribute('data-review-id') || '',
          author_name,
          profile_photo_url: imageEl ? imageEl.src : '',
          rating,
          text,
          relative_time_description: timeEl ? timeEl.textContent.trim() : '',
          time: Math.floor(Date.now() / 1000)
        };
      }).filter((review) => {
        return review.author_name &&
          !/^google$/i.test(review.author_name) &&
          !/Dr\.?\s+Awanti/i.test(review.author_name) &&
          !/reviews are automatically processed/i.test(review.author_name);
      });

        return [...domReviews, ...parseReviewsFromVisibleText()];
      });
    }

    const allSearchReviews = [];
    const sortPasses = ['Most relevant', 'Newest', 'Highest rating', 'Lowest rating'];

    for (const sortPass of sortPasses) {
      if (sortPass !== 'Most relevant') {
        await selectSearchSort(sortPass);
      }
      const passReviews = await parseCurrentSearchPanel();
      allSearchReviews.push(...passReviews);
      console.log(`Google Search ${sortPass} pass parsed: ${dedupeReviews(passReviews).length}; combined unique: ${dedupeReviews(allSearchReviews).length}`);
      if (dedupeReviews(allSearchReviews).length >= expectedReviewCount) {
        break;
      }
    }

    const searchReviews = allSearchReviews;

    const uniqueSearchReviews = dedupeReviews(searchReviews);
    console.log(`Google Search panel reviews parsed: ${uniqueSearchReviews.length}`);
    if (uniqueSearchReviews.length === 0) {
      fs.writeFileSync(path.join(__dirname, '../debug-search-reviews.html'), await page.content());
      fs.writeFileSync(path.join(__dirname, '../debug-search-reviews.txt'), await page.evaluate(() => document.body.innerText || ''));
    }
    return uniqueSearchReviews;
  }
  
  // Try text matching for "Google reviews" or "# reviews"
  const clicked = await clickByVisibleText([
    '^\\d+\\s+Google\\s+reviews$',
    '^\\d+\\s+reviews$',
    '^Google reviews$',
    '^Google Reviews$'
  ]);

  if (clicked) {
    console.log('Successfully clicked reviews link. Waiting for reviews dialog...');
    clickedReviews = true;
    await new Promise(r => setTimeout(r, 5000));

    const clickedViewAll = await clickByVisibleText(['^View all Google reviews$']);
    if (clickedViewAll) {
      console.log('Clicked "View all Google reviews". Waiting for full review panel...');
      await new Promise(r => setTimeout(r, 7000));
    }
  } else {
    console.log('Could not find Google reviews link text. Trying selector-based clicks...');
    const selectors = [
      'a[data-async-trigger^="review"]',
      'a[data-fid]',
      'a[class*="review"]',
      'span[class*="review"]'
    ];
    for (const sel of selectors) {
      try {
        const btn = await page.$(sel);
        if (btn) {
          await btn.click();
          console.log(`Clicked reviews link using selector: ${sel}`);
          clickedReviews = true;
          await new Promise(r => setTimeout(r, 5000));
          break;
        }
      } catch (e) {}
    }
  }

  // Scroll the review container if possible to load more reviews
  console.log('Scrolling reviews list to load more...');
  await page.evaluate(async () => {
    // Try to find the scrollable container inside the reviews dialog/modal
    const container = document.querySelector('.review-dialog-list, .gws-localreviews__general-reviews-block, div[role="dialog"] div[class*="reviews"]');
    if (container) {
      for (let i = 0; i < 6; i++) {
        container.scrollTop = container.scrollHeight;
        await new Promise(r => setTimeout(r, 1200));
      }
    } else {
      // Fallback: scroll the page body
      for (let i = 0; i < 6; i++) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1200));
      }
    }
  });

  console.log('Extracting reviews from DOM...');
  const mapsReviews = await scrapeMapsReviews();
  let reviews = dedupeReviews(mapsReviews);

  if (reviews.length < expectedReviewCount) {
    console.log(`Only ${reviews.length} unique Google Maps reviews found. Not adding placeholders or snippets.`);
  }

  if (false && reviews.length === 0) {
    reviews = await page.evaluate(() => {
    const results = [];
    
    // Selectors for review card items
    // Google Search local reviews: .gws-localreviews__google-review or .WMxUBd
    // Google Maps reviews: .jftiEf
    let reviewCards = Array.from(document.querySelectorAll('.gws-localreviews__google-review, .WMxUBd, .jftiEf'));
    
    // Fallback: search for elements with review data attributes
    if (reviewCards.length === 0) {
      reviewCards = Array.from(document.querySelectorAll('[data-review-id]'));
    }
    
    // Second fallback: look for any divs that contain author-like images and rating stars
    if (reviewCards.length === 0) {
      reviewCards = Array.from(document.querySelectorAll('div')).filter(el => {
        const className = el.className || '';
        return typeof className === 'string' && 
          (className.includes('review') || className.includes('Review')) && 
          el.querySelector('img') && 
          el.textContent.length > 50;
      });
    }

    reviewCards.forEach(card => {
      try {
        // 1. Author Name
        const nameEl = card.querySelector('.TSUbDb, .d4135e, .fontBodyMedium, [class*="author"], [class*="name"]');
        const author_name = nameEl ? nameEl.textContent.trim() : '';
        
        // 2. Profile Photo
        const imgEl = card.querySelector('img');
        const profile_photo_url = imgEl ? imgEl.src : 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo';
        
        // 3. Rating
        let rating = 5;
        const ratedEl = card.querySelector('[aria-label*="star"], [aria-label*="Rated"], [aria-label*="rating"]');
        if (ratedEl) {
          const label = ratedEl.getAttribute('aria-label') || '';
          const match = label.match(/([1-5])(?:\.0)?\s*(?:star|out of)/i) || label.match(/([1-5])\/5/);
          if (match) {
            rating = parseInt(match[1]);
          }
        } else {
          // Count active star characters
          const text = card.textContent || '';
          const starsMatch = text.match(/★{1,5}/);
          if (starsMatch) {
            rating = starsMatch[0].length;
          }
        }
        
        // 4. Review Text
        const textEl = card.querySelector('.Jtu6CA, .wiI7pd, .MyEned, [class*="text"], [class*="comment"]');
        let text = textEl ? textEl.textContent.trim() : '';
        
        // Remove Google's "More" or expansion suffix
        if (text.endsWith('More')) {
          text = text.substring(0, text.length - 4).trim();
        }
        
        const time = Math.floor(Date.now() / 1000);
        
        if (author_name) {
          results.push({
            author_name,
            profile_photo_url,
            rating,
            text,
            time
          });
        }
      } catch (err) {}
    });

    if (results.length === 0) {
      const bodyText = document.body.innerText || '';
      const reviewSummaryStart = bodyText.indexOf('Reviews are automatically processed');
      const reviewSummaryEnd = bodyText.indexOf('View all Google reviews', reviewSummaryStart);
      const reviewSummaryText = reviewSummaryStart >= 0
        ? bodyText.slice(reviewSummaryStart, reviewSummaryEnd > reviewSummaryStart ? reviewSummaryEnd : reviewSummaryStart + 1600)
        : bodyText;
      const snippetMatches = Array.from(reviewSummaryText.matchAll(/"([^"]{20,260})"/g))
        .map(match => match[1].trim())
        .filter(text => !/photo|google|review|feedback|error/i.test(text));

      Array.from(new Set(snippetMatches)).slice(0, 8).forEach((text, index) => {
        results.push({
          author_name: `Google reviewer ${index + 1}`,
          profile_photo_url: '',
          rating: 5,
          text,
          time: Math.floor(Date.now() / 1000)
        });
      });
    }
    
    return results;
  });
  }

  console.log(`Extracted raw count of reviews: ${reviews.length}`);

  if (reviews.length > 0) {
    console.log(`✅ Successfully parsed ${reviews.length} reviews from Google!`);
    const dataPath = path.join(__dirname, '../data/reviews.json');
    
    let existingReviews = [];
    try {
      if (fs.existsSync(dataPath)) {
        existingReviews = JSON.parse(fs.readFileSync(dataPath, 'utf8').replace(/^\uFEFF/, ''));
      }
    } catch(e) {}

    const uniqueReviews = dedupeReviews([...reviews, ...existingReviews]);

    const reviewsWithOriginalNames = uniqueReviews
      .filter(review => {
        return review.author_name &&
          !/^Google reviewer\s+\d+$/i.test(review.author_name) &&
          !/^Google$/i.test(review.author_name);
      })
      .sort((a, b) => {
        if (a.review_id && !b.review_id) return -1;
        if (!a.review_id && b.review_id) return 1;
        return 0;
      });

    const finalReviews = reviewsWithOriginalNames.slice(0, expectedReviewCount);
    fs.writeFileSync(dataPath, JSON.stringify(finalReviews, null, 2));
    console.log(`Saved a total of ${finalReviews.length} unique reviews to data/reviews.json`);
  } else {
    console.log('⚠️ No reviews could be extracted.');
    console.log('Dumping current DOM structure to debug.html for inspection.');
    const fullHtml = await page.content();
    fs.writeFileSync(path.join(__dirname, '../debug.html'), fullHtml);
  }

  await browser.close();
  console.log('Scraping completed.');
})();
