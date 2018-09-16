const fs = require('fs');
const puppeteer = require('puppeteer');

const url = 'https://coursehunters.net/course/yazyk-programmirovaniya-rust';

(async () => {
  const file = fs.createWriteStream('./rename.txt');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //TODO: make url dynamic.
  await page.goto(url);

  const lessonTitles = await page.evaluate(() => {
    const lessonTitleNodes = [...document.getElementsByClassName('lessons-list__progress')];
    const lessonTitles = [];

    lessonTitleNodes.forEach(el => {
      const title = el.nextElementSibling.innerHTML;
      lessonTitles.push(title.split('Урок').join(''));
    });

    return lessonTitles;
  });

  lessonTitles.map(lessonTitle => {
    if (lessonTitle.includes('&amp;')) lessonTitle = lessonTitle.replace('&amp;', '&');

    return file.write(`${lessonTitle}.mp4` + '\n');
  });

  await browser.close();
})();
