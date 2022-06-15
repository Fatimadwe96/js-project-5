(function() {
    const choices = ["rock", "paper", "scissor"];
    addChoices();
    initListeners();

    function addChoices() {
        addPlayerChoices();
        addComputerChoices();
    }

    function initListeners() {
        handleOnItemClicked();
        hanldeOnNewGameClicked();
    }

    function handleOnItemClicked() {
        const cardItems = document.querySelectorAll(".card.player .card-item");
        cardItems.forEach(function(element) {
            element.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                clearSelection();
                this.classList.add("selected");
                const inputElem = this.querySelector('input');
                inputElem.checked = true;
                
                const playerChoice = this.querySelector('[name="choice"]').id;

                const randomChoiceIndex = Math.floor(Math.random() * 3);
                const computerChoice = choices[randomChoiceIndex];

                document.querySelector(`.card.computer .card-item.${computerChoice}`).classList.add("selected")

                setWinnder(whichWinner(playerChoice, computerChoice));
            });
        });
    }

    function clearSelection() {
        const items = document.querySelectorAll(".card .card-item");
        items.forEach(function(element) {
            element.classList.remove("selected");
        });
        const inputs = document.querySelectorAll('input');
        inputs.forEach(function(element) {
            element.checked = false;
        });
    }

    function whichWinner(p1, p2) {
        const choices = {rock: 'scissor', scissor: 'paper', paper: 'rock'};
        return p1 === p2 ? "It's a draw" : choices[p1] === p2 ? "The winner is Player" : "The winner is Computer";
    }

    function setWinnder(winner) {
        document.querySelector("#winner").innerText = winner;
    }

    function hanldeOnNewGameClicked() {
        document.getElementById("newgame").addEventListener("click", function(e) {
            clearSelection();
            setWinnder("");
        });
    }

    function addPlayerChoices() {
        const optionsEle = document.querySelector('.card.player .card-options');
        choices.forEach(function(c) {
            const option = document.createElement('button');
            option.classList.add("card-item");
            option.innerHTML = `
                <label for="${c}"><img src="assets/${c}.png" alt="${c}" class="img"></label>
                <input type="radio" name="choice" id="${c}" required>
            `;
            optionsEle.append(option);
        });
        
    }

    function addComputerChoices() {
        const optionsEle = document.querySelector('.card.computer .card-options');
        choices.forEach(function(c) {
            const option = document.createElement('div');
            option.classList.add("card-item", c);
            option.innerHTML = `
                <label for="${c}"><img src="assets/${c}.png" alt="${c}" class="img"></label>
            `;
            optionsEle.append(option);
        });
        
    }
})();