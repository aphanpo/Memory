
const deck = document.querySelector('.deck') 

let openCards = []
let turns = 9




function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'))
	const shuffledCards = shuffle(cardsToShuffle)
	for (card of shuffledCards) {
		deck.appendChild(card)
	}
}

shuffleDeck()

function shuffle(array) {
  var shuf = array.length, t, i;
  while (shuf) {
    i = Math.floor(Math.random() * shuf--);
    t = array[shuf];
    array[shuf] = array[i];
    array[i] = t;
  }

  return array;
}


deck.addEventListener('click', event => {
	const clickTarget = event.target
	if (clickTarget.classList.contains('card') && 
		openCards.length < 2  && 
		!openCards.includes(clickTarget)
		) {
		openCard(clickTarget)
		addOpenCard(clickTarget)
		if(openCards.length === 2) {
			checkForMatch(clickTarget)
		} 
		
	}
})

function openCard(card) {
	card.classList.toggle('open')
	card.classList.toggle('show')
}

function addOpenCard (clickTarget) {
	openCards.push(clickTarget)
}

if (openCards.length === 2) {
	checkForMatch(clickTarget)
	addTurns
}

function lost() {
	if (turns <= 0) {
        alert("YOU LOST! Play again to keep improving your mmemory! Refresh the page.")
	}
}

function win() {
    if (turns >= 0) {
        alert("YAY! CONGRATS, YOU WIN!")
    }
}

function checkForMatch () {
	if (
		openCards[0].firstElementChild.className ===
		openCards[1].firstElementChild.className
	) {
		openCards[0].classList.toggle('match')
        openCards[1].classList.toggle('match')
        openCards = []

	} else {
		setTimeout(() => {
			openCard(openCards[0])
			openCard(openCards[1])
			turns--
            lost()
			openCards = []
			
		}, 500)
		
	}
	$('.turns').html(`You have ${turns} turns left.`)

}