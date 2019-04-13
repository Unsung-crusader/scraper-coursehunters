const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports = function renameVideos() {
  const lessonTitles = fs
    .readFileSync('lessons_titles.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(x => !!x);

  let lesson = 1;

  for (let lessonTitle of lessonTitles) {
    fs.rename(`videos/lesson${lesson}.mp4`, `videos/${lessonTitle}`, err => {
      if (err) console.log('ERROR: ' + err);
    });

    lesson++;
  }
}
