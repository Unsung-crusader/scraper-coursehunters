const fs = require('fs');
const puppeteer = require('puppeteer');
const readline = require('readline');

scrapeTitle();

async function scrapeTitle() {
  const url = await getUrlFromConsole();
  const file = fs.createWriteStream('./lessons_titles.txt');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const lessonTitles = await page.evaluate(getLessonsTitle);

  lessonTitles.map(lessonTitle => {
    if (lessonTitle.includes('&amp;')) lessonTitle = lessonTitle.replace('&amp;', '&');

    return file.write(`${lessonTitle}.mp4` + '\n');
  });

  console.log('DONE! TITLES COPIED INTO lessons_titles.txt');
  await browser.close();
}

function getUrlFromConsole() {
  const reader = readline.createInterface(process.stdin, process.stdout, null);

  return new Promise((resolve, reject) => {
    reader.question('Enter the courses url of the coursehunters: ', answer => {
      resolve(answer);
      reader.close();
      process.stdin.destroy();
    });
  });
}

function getLessonsTitle() {
  const lessonTitleNodes = [...document.getElementsByClassName('lessons-list__progress')];
  const lessonTitles = [];

  lessonTitleNodes.forEach(el => {
    const title = el.nextElementSibling.innerHTML;
    lessonTitles.push(title.split('Урок').join(''));
  });

  return lessonTitles;
}
