const Nightmare = require('nightmare');
const fs = require('fs');

const nightmare = Nightmare({ show: true });
const file = fs.createWriteStream('./rename.txt');

//make the goto Url more dynamic
nightmare
  .goto('https://coursehunters.net/course/yazyk-programmirovaniya-rust')
  .evaluate(() => {
    //converting HTMLCollection into an array
    const lessonListElements = [
      ...document.getElementsByClassName('lessons-list__progress'),
    ];
    let lessonLists = [];
    lessonListElements.forEach(el =>
      lessonLists.push(el.nextElementSibling.innerHTML.split('Урок').join(''))
    );
    return lessonLists;
  })
  .end()
  .then(lessonLists =>
    lessonLists.map(lessonList => {
      if (lessonList.includes('&amp;')) lessonList = lessonList.replace('&amp;', '&');

      return file.write(`${lessonList}.mp4` + '\n');
    })
  )

  .catch(error => {
    console.error('Search failed:', error);
  });
