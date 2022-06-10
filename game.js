var userClickSequence = []
var gameSequence = []
var colorArray = ['green', 'red', 'yellow', 'blue']
var level = 0
$(document).one('keydown', start)
$('.btn').on('click', (e) => {
  var clickedBtn = e.target.getAttribute('id')
  userClickSequence.push(clickedBtn)
  playAnimation(clickedBtn)
  playSound(clickedBtn)
  checkAnswer(userClickSequence.length-1)

  // if (JSON.stringify(userClickSequence) == JSON.stringify(gameSequence)) {
  
  // } else {
  //   playAnimation('game-over')
  //   var audio = new Audio('sounds/wrong.mp3')
  //   audio.play()
  //   $('h1').text('Game Over! Kindly Refresh the Page')
  // }
})

function start() {
  userClickSequence = []
  var random = Math.floor(Math.random() * 4)
  $('#' + colorArray[random])
    .delay(150)
    .fadeOut()
    .fadeIn()
  playSound(colorArray[random])
  gameSequence.push(colorArray[random])
  ++level
  $('h1').text('Level ' + level)
}

function playAnimation(clickedBtn) {
  if (clickedBtn === 'game-over') {
    $('body').addClass(clickedBtn)
    setTimeout(() => {
      $('body').removeClass(clickedBtn)
    }, 100)
  } else {
    $('#' + clickedBtn).addClass('pressed')
    setTimeout(() => {
      $('#' + clickedBtn).removeClass('pressed')
    }, 100)
  }
}

function playSound(clickedBtn) {
  var audio = new Audio('sounds/' + clickedBtn + '.mp3')
  audio.play()
}

function checkAnswer(currentLevel){
  if (gameSequence[currentLevel] === userClickSequence[currentLevel]) {
    if (gameSequence.length === userClickSequence.length) {
      setTimeout(() => {
        start();
      }, 1000);
    }
  }
  else{
    playAnimation('game-over')
    var audio = new Audio('sounds/wrong.mp3')
    audio.play()
    $('h1').text('Game Over! Kindly Refresh the Page')
  }

}