// game.js: Optimized Slots Mini-Game Logic

window.addEventListener("load", () => {
  const spinBtn = document.getElementById("spin-btn");
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  const resultMessage = document.getElementById("result-message");
  const userCreditsEl = document.getElementById("user-credits");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
      alert("No user is currently logged in!");
      return;
  }

  // Display current credits
  updateCreditsDisplay();

  spinBtn.addEventListener("click", () => {
      if (currentUser.credits <= 0) {
          alert("You have no credits left!");
          return;
      }

      currentUser.credits -= 1;
      updateCreditsDisplay();

      // Spin reels
      const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐"];
      const results = [getRandomSymbol(symbols), getRandomSymbol(symbols), getRandomSymbol(symbols)];

      [reel1.textContent, reel2.textContent, reel3.textContent] = results;

      // Determine winnings
      const winAmount = calculateWinnings(results);
      currentUser.credits += winAmount;
      updateCreditsDisplay();
      resultMessage.textContent = winAmount > 0 ? 
          (winAmount === 10 ? `JACKPOT! You won ${winAmount} credits!` : `Nice! You won ${winAmount} credits.`) 
          : "No match. Try again!";

      // Update storage
      updateUserCredits();
  });

  function getRandomSymbol(symbols) {
      return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function calculateWinnings(results) {
      const [r1, r2, r3] = results;
      return (r1 === r2 && r2 === r3) ? 10 : (r1 === r2 || r2 === r3 || r1 === r3) ? 3 : 0;
  }

  function updateCreditsDisplay() {
      userCreditsEl.textContent = currentUser.credits;
  }

  function updateUserCredits() {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = allUsers.findIndex(user => user.username === currentUser.username);
      
      if (userIndex !== -1) {
          allUsers[userIndex].credits = currentUser.credits;
          localStorage.setItem("users", JSON.stringify(allUsers));
      }
      
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
});
