const submit = document.getElementById('submit');
const green = document.querySelectorAll('.correct');
const orange = document.querySelectorAll('.orange');
const grey = document.getElementById('badLetters');
const result = document.getElementById('result');
const closeButton = document.getElementById('close');
const possibleSolutions = document.getElementById('possibleSolutions');

let fiveletters;
fetch('https://random-word-api.herokuapp.com/all?swear=0&lang=en')
  .then((response) => response.json())
  .then(function retrive(data) {
    fiveletters = data.filter((word) => word.length == 5);
  });

submit.addEventListener('click', function (e) {
  let greens = [];
  let oranges = [];
  let greys = [];
  //GREENS
  for (let i = 0; i < green.length; i++) {
    greens.push(green[i].value);
  }

  //ORANGES
  for (let i = 0; i < orange.length; i++) {
    let arr = [];
    let splittedOrange = orange[i].value.split('');
    for (split of splittedOrange) {
      arr.push(split);
    }
    oranges.push(arr);
  }

  //greyS
  let splittergreys = grey.value.split('');
  for (let i = 0; i < splittergreys.length; i++) {
    greys.push(splittergreys[i]);
  }
  let allResults = [];
  for (let i = 0; i < fiveletters.length; i++) {
    word = fiveletters[i];
    splittedWord = word.split('');
    if (
      //Greens check
      (splittedWord[0] === greens[0] || greens[0].length == 0) &&
      (splittedWord[1] === greens[1] || greens[1].length == 0) &&
      (splittedWord[2] === greens[2] || greens[2].length == 0) &&
      (splittedWord[3] === greens[3] || greens[3].length == 0) &&
      (splittedWord[4] === greens[4] || greens[4].length == 0) &&
      //Oranges check
      ((splittedWord.some((r) => oranges[0].indexOf(r) >= 0) &&
        !oranges[0].some((r) => splittedWord[0].indexOf(r) == 0)) ||
        oranges[0].length == 0) &&
      ((splittedWord.some((r) => oranges[1].indexOf(r) >= 0) &&
        !oranges[1].some((r) => splittedWord[1].indexOf(r) == 0)) ||
        oranges[1].length == 0) &&
      ((splittedWord.some((r) => oranges[2].indexOf(r) >= 0) &&
        !oranges[2].some((r) => splittedWord[2].indexOf(r) == 0)) ||
        oranges[2].length == 0) &&
      ((splittedWord.some((r) => oranges[3].indexOf(r) >= 0) &&
        !oranges[3].some((r) => splittedWord[3].indexOf(r) == 0)) ||
        oranges[3].length == 0) &&
      ((splittedWord.some((r) => oranges[4].indexOf(r) >= 0) &&
        !oranges[4].some((r) => splittedWord[4].indexOf(r) == 0)) ||
        oranges[4].length == 0) &&
      //greys check
      !greys.some((r) => splittedWord[0].indexOf(r) == 0) &&
      !greys.some((r) => splittedWord[1].indexOf(r) == 0) &&
      !greys.some((r) => splittedWord[2].indexOf(r) == 0) &&
      !greys.some((r) => splittedWord[3].indexOf(r) == 0) &&
      !greys.some((r) => splittedWord[4].indexOf(r) == 0)
    ) {
      result.style.display = 'block';
      allResults.push(' ' + splittedWord.join(''));
    }
  }
  if (allResults.length > 30) {
    possibleSolutions.innerHTML =
      '<p style="font-size:1rem"> There are way too many options<br> Please provide more inputs. <br> Good words to narrow down the options:</p><br> CRANE <br> OTHER <br> NAILS';
  } else {
    possibleSolutions.innerHTML = allResults;
  }
});

closeButton.addEventListener('click', function (e) {
  result.style.display = 'none';
});
