"use strict";
const dominoCards = [
    [1, 2],
    [1, 1],
    [4, 1],
    [3, 3],
    [6, 1],
];
const app = document.getElementById("app");
if (app) {
    app.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Domino Cards</h1>
    <ul class="list-disc pl-5">
      ${dominoCards.map((card) => `<li>${card[0]} | ${card[1]}</li>`).join("")}
    </ul>
  `;
}
