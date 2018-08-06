var cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var ind = 0;
var openCards = [];
var openCards1 = [];
var id = [];
var match1, match2;
var moves = 0;
var opened = 0;
var flag = 0;
var minutes = 0;

//Generate Cards and shuffle them.
function generate() {
        // Shuffle the cards
        cards = cards.concat(cards);
        cards = shuffle(cards);
        cards.forEach(create);
}
//Create cards and append those cards.
function create(currentCard) {
    var selectedCard = document.querySelector('.deck');
    var li = document.createElement('li');
    var i = document.createElement('i');
    li.setAttribute('class', "card");
    i.setAttribute('class', `fa ${currentCard}`);
    i.setAttribute('id', `${ind}`);
    ind++;
    li.append(i);
    selectedCard.append(li);

}
//To display the star rating
function starRating() {
    var stars = document.querySelector('.stars');
    if (moves <= 8) {
        $(stars).empty();
        for (var i = 0; i < 3; i++) {
          // Appending 3 stars
            var li = document.createElement('li');
            var ii = document.createElement('i');
            ii.setAttribute('class', 'fa fa-star');
            li.append(ii);
            stars.append(li);
        }
        f = 1;
    } else if (moves <= 12) {
        $(stars).empty();
        for (var i = 0; i < 2; i++) {
          // Appending 2 stars
            var li = document.createElement('li');
            var ii = document.createElement('i');
            ii.setAttribute('class', 'fa fa-star');
            li.append(ii);
            stars.append(li);
        }
        var li = document.createElement('li');
        var ii = document.createElement('i');
        ii.setAttribute('class', 'fa fa-star-o');
        li.append(ii);
        stars.append(li);
    } else {
        $(stars).empty();
        // Appending 1 stars
        var li = document.createElement('li');
        var ii = document.createElement('i');
        ii.setAttribute('class', 'fa fa-star');
        li.append(ii);
        stars.append(li);
        for (var i = 0; i < 2; i++) {
            var li = document.createElement('li');
            var ii = document.createElement('i');
            ii.setAttribute('class', 'fa fa-star-o');
            li.append(ii);
            stars.append(li);
        }
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//To create the modal
function createModal() {
  $('.mainBody').css('display', 'none');
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            location.reload();
        }
    }

    var b = document.getElementById('scorecard');
    document.getElementById('scorecard').setAttribute("style", "text-align : center ; font-weight : bold; font-size : 20px");
    var a = document.createElement("p");
    a.innerHTML = "Moves- " + moves;
    b.appendChild(a);

    var e = document.createElement("p");
    e.innerHTML = "Time- " + mins + " mins : " + seconds + " secs";
    b.appendChild(e);


     var c = document.createElement("p");
     if(moves<=8)
      c.innerHTML = 'Stars = 3';
     else if(moves<=12)
      c.innerHTML = 'Stars = 2';
     else
      c.innerHTML = 'Stars = 1';

      b.appendChild(c);
}

//Initial function to run the project and initialize the clicks on cards
function cl() {
    generate();
    var ele = document.querySelector('.card ');
    $('.restart').on('click', function() {
        location.reload();
    });
    $('.moves').html(`${moves}`);
    var stars = document.querySelector('.stars');
    for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        var ii = document.createElement('i');
        ii.setAttribute('class', 'fa fa-star');
        li.append(ii);
        stars.append(li);
    }
    $(".card").on('click', function(e) {
        if(flag == 0){
          // To check that the function is called for the first time.
          countdown(minutes);
          flag = 1;
        }
        var a = $(this.firstChild).attr('id');
        id.push(a);
        if (id[0] == id[1]) {
          // Check if the card is not clicked twice.
            id[1] = null;
            moves--;

        } else {
            if (openCards.length <= 1) {
                $(this).addClass("show");
                $(this).addClass("open");
                if (openCards.length === 0) {
                  // When just one card is open
                    match1 = this;
                    openCards.push($(this.firstChild).attr('class'));
                    openCards1.push(this);
                    }
                    else if (openCards.length === 1) {
                    moves++;
                    $(this).click(function() {
                        return true;
                    });
                    openCards1.push(this);
                    match2 = this;
                    $(match2).click(false);
                    openCards.push($(this.firstChild).attr('class'));
                    if (openCards[0] != openCards[1]) {
                        setTimeout(function() {
                            $(match1).attr('class', 'card');
                            $(match2).attr('class', 'card');
                            openCards = [];
                        }, 1000);

                    } else {
                      // To restore the click functionality on the cards
                        openCards1[0].style.pointerEvents = 'initial';
                        openCards1[1].style.pointerEvents = 'initial';
                        openCards1 = [];
                        opened++;
                        openCards = [];
                    }
                    id = [];
                    var myFunc = function(event) {
                        event.stopPropagation();
                    }
                    var f = 0;
                    $(match1).on('click', myFunc);
                    $(match2).on('click', myFunc);
                    $('.moves').html(`${moves}`);
                    starRating();
                    if (opened >= 8) {
                      createModal();
                    }
                }
            }
        }
    });
}

/*------Timer for the page.------*/
var timeoutHandle;
var seconds;
var mins = 0;

function countdown(minutes) {
    seconds=0;
    mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins
        seconds++;
        counter.innerHTML =
            current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds < 59) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
                setTimeout(function() {
                countdown(mins + 1);
            }, 1000);
        }
    }
    tick();
}
cl();
