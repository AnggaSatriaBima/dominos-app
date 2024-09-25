"use strict";
// Array untuk menyimpan data domino
var dominoData = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
];
// Fungsi untuk render kartu domino ke dalam DOM
function renderDominoCards() {
    var dominoList = document.getElementById("domino-list");
    dominoList.innerHTML = "";
    dominoData.forEach(function (card) {
        var li = document.createElement("li");
        li.textContent = "".concat(card[0], " | ").concat(card[1]);
        dominoList.appendChild(li);
    });
}
// Fungsi untuk menambah kartu domino baru
function addDominoCard() {
    var leftInput = document.getElementById("left-number");
    var rightInput = document.getElementById("right-number");
    var leftNumber = Number(leftInput.value);
    var rightNumber = Number(rightInput.value);
    // Pastikan input valid
    if (!isNaN(leftNumber) && !isNaN(rightNumber)) {
        dominoData.push([leftNumber, rightNumber]); // Tambahkan kartu baru ke dominoData
        renderDominoCards(); // Render kartu setelah penambahan
        countDoubleNumbers(); // Hitung kembali jumlah double numbers
    }
    else {
        alert("Please enter valid numbers for both sides.");
    }
    // Kosongkan input field setelah menambah
    leftInput.value = "";
    rightInput.value = "";
}
// Fungsi untuk menghapus kartu domino tertentu
function removeSpecificDominoCard() {
    var leftInput = document.getElementById("remove-left-number");
    var rightInput = document.getElementById("remove-right-number");
    var leftNumber = Number(leftInput.value);
    var rightNumber = Number(rightInput.value);
    // Pastikan input valid
    if (!isNaN(leftNumber) && !isNaN(rightNumber)) {
        // Hapus kartu domino berdasarkan nilai di leftNumber dan rightNumber
        dominoData = dominoData.filter(function (card) { return !(card[0] === leftNumber && card[1] === rightNumber); });
        renderDominoCards(); // Render kartu setelah penghapusan
        countDoubleNumbers(); // Hitung kembali jumlah double numbers
    }
    else {
        alert("Please enter valid numbers for both sides to remove.");
    }
    // Kosongkan input field setelah menghapus
    leftInput.value = "";
    rightInput.value = "";
}
function sortDomino(order) {
    dominoData.sort(function (a, b) {
        // Urutkan berdasarkan elemen kiri terlebih dahulu
        if (order === "desc") {
            if (a[0] !== b[0]) {
                return b[0] - a[0]; // Urutkan elemen kiri secara descending
            }
            else {
                return b[1] - a[1]; // Jika elemen kiri sama, urutkan elemen kanan secara descending
            }
        }
        else {
            if (a[0] !== b[0]) {
                return a[0] - b[0]; // Urutkan elemen kiri secara ascending
            }
            else {
                return a[1] - b[1]; // Jika elemen kiri sama, urutkan elemen kanan secara ascending
            }
        }
    });
    renderDominoCards(); // Render ulang kartu setelah sorting
}
function flipDomino() {
    dominoData = dominoData.map(function (card) { return [card[1], card[0]]; });
    renderDominoCards();
}
function removeDuplicates() {
    console.log("Before removing duplicates:", dominoData); // Log sebelum penghapusan
    var seen = new Set(); // Set to track the combination of cards already seen//+
    dominoData = dominoData.filter(function (card) {
        // Urutkan angka kartu agar [1, 2] dianggap sama dengan [2, 1]
        var sortedCard = card.slice().sort(function (a, b) { return a - b; });
        var key = "".concat(sortedCard[0], "-").concat(sortedCard[1]); // Gunakan sebagai kunci untuk Set
        if (seen.has(key)) {
            // Jika kombinasi sudah ada di Set, maka dianggap duplikat
            return false;
        }
        else {
            seen.add(key); // Jika belum, tambahkan kombinasi ke Set
            return true;
        }
    });
    console.log("After removing duplicates:", dominoData); // Log setelah penghapusan
    renderDominoCards(); // Render kartu setelah penghapusan
    countDoubleNumbers(); // Hitung kembali jumlah double numbers
}
function resetDomino() {
    dominoData = [
        [6, 1],
        [4, 3],
        [5, 1],
        [3, 4],
        [1, 1],
        [3, 4],
        [1, 2],
    ];
    renderDominoCards();
    countDoubleNumbers();
}
function countDoubleNumbers() {
    var doubleNumbers = dominoData.filter(function (card) { return card[0] === card[1]; }).length;
    var doubleNumberCount = document.getElementById("double-number-count");
    doubleNumberCount.textContent = "Double Numbers: ".concat(doubleNumbers);
}
// Fungsi untuk menghapus nomor berdasarkan input
function removeNumber() {
    var input = document.getElementById("number-input");
    var numberToRemove = Number(input.value);
    // Tambahkan console.log untuk debugging
    console.log("Number to remove:", numberToRemove);
    console.log("Before removal:", dominoData);
    if (!isNaN(numberToRemove)) {
        // Filter dominoData untuk menghapus kartu yang jumlah nilai kiri dan kanannya sama dengan numberToRemove
        dominoData = dominoData.filter(function (card) {
            var cardSum = card[0] + card[1];
            return cardSum !== numberToRemove;
        });
        // Log setelah penghapusan
        console.log("After removal:", dominoData);
        renderDominoCards(); // Render kartu setelah penghapusan
        countDoubleNumbers(); // Hitung kembali jumlah double numbers
    }
    else {
        alert("Please enter a valid number.");
    }
    // Clear the input field after removing
    input.value = "";
}
// Render kartu domino saat halaman dimuat pertama kali
renderDominoCards();
countDoubleNumbers();
