// Canvas setup 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

// Modal elements
const gameModal = document.getElementById("gameModal");
const closeButton = document.querySelector(".close");

// Game variables
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const bagWidth = 80;
const bagHeight = 20;
let bagX = (canvasWidth - bagWidth) / 2;
const bagY = canvasHeight - bagHeight - 50;

let score = 0;
let missedItems = 0;
const maxMisses = 5;

const items = [];
const itemWidth = 60;
const itemHeight = 60;
let itemSpeed = 3;

let isGameRunning = false;
let assetsLoaded = false;

// ----------------------
// IMAGES (PRELOAD)
// ----------------------

const itemImages = [
 
  "https://i.postimg.cc/fbKqSZjJ/4087-C893-8-D2-D-4197-BADD-392-F80-C0-CEF4.png",
  "https://i.postimg.cc/W3NK5tbG/4-B1107-CA-21-CA-4-B9-E-8647-74967-C040-F14.png",
  "https://i.postimg.cc/fLqH5KPs/6-C4-DE37-F-8047-4-D83-A111-1-CC8-C558-BC1-C.png",
  "https://i.postimg.cc/BQrVdmnQ/7-F1999-A8-E275-4-DF2-A29-A-AE74663-D0-B78.png",
  "https://i.postimg.cc/J4DF6fm2/8-C6600-A9-B3-C4-4-E8-A-9-A15-6-D00-C6-A7-CE37.png",
  "https://i.postimg.cc/7hbRyczb/AA96080-B-BD6-C-45-D5-A28-E-277-E25-DE0-E6-E.png",

  "https://i.postimg.cc/0NxHNrST/AEA17193-29-C1-4-FC8-A2-E4-03-BC015-C02-F8.png",
  "https://i.postimg.cc/xC6ZhYcW/B9-F0835-B-DD2-B-4-BFC-8073-6-DC5-D596-E33-E.png",
  "https://i.postimg.cc/YSfZNQk2/D1-A6564-C-C325-4-A19-8-B75-EA8-C72-C37-FEF.png",
  "https://i.postimg.cc/NMjJ1Vpb/F399-E083-BC3-E-4-E54-AB7-D-BBA7-B9601934.png",
  "https://i.postimg.cc/DfYDcvVG/F930-C266-993-E-4-CBD-9731-3766016-C8400.png",
  "https://i.postimg.cc/904Lk937/FABB6-A5-C-8-DA3-46-F6-BB8-F-7-C82588-A47-E8.png",
  

  "https://i.postimg.cc/g02Gj4T5/712451-Tabitha-E2-80-93-FS-Halloween-silo-r2-600x600.webp",
  "https://i.postimg.cc/xd198g44/712481-Centerpiece-R-600x600.webp",
  "https://i.postimg.cc/3wx3N9cq/712482-Oklahoma-Rose-R-600x600.webp",
  "https://i.postimg.cc/Pq5dJKR9/712487-Biscuits-Gravy-together-600x600.webp",
  "https://i.postimg.cc/DzpnXs9B/712513-Slither-right-600x600.webp",
  "https://i.postimg.cc/g0tmZRCg/712535-Faded-Love-R-600x600.webp",
  "https://i.postimg.cc/wB4gmJCW/712536-Redbud-R-600x600.webp",

  "https://i.postimg.cc/5tKbCvhG/B-EV-10472-Salud-Black-L-1024x1024.webp",
  "https://i.postimg.cc/DzpnXs9t/B-EV-10472-Salud-Grey-L-1024x1024.webp",
  "https://i.postimg.cc/Xv14CFRP/B-EV-10516-Legacy-L-1024x1024.webp",
  "https://i.postimg.cc/d0NwydbN/B-EV-10517-Tamarkuz-R-1024x1024.webp",
  "https://i.postimg.cc/7Ltw20vr/B-EV-10722-Corgi-Hill-Flinka-064-1024x1024.webp",
  "https://i.postimg.cc/pdcRFzNH/ned2-480x480.webp",
  "https://i.postimg.cc/d0NwyrMw/preview-1024x1024.webp",

  "https://i.postimg.cc/3wfYvmM7/rosanna1-1024x1024.webp",
  "https://i.postimg.cc/mrpBHCxZ/wimpy-R-FINAL-600x600.webp",

  "https://i.postimg.cc/mr6Cd196/Untitled685-20260616014710.png",
  "https://i.postimg.cc/Ls0LygPQ/Untitled685-20260616014731.png",
  "https://i.postimg.cc/KYsB93T9/Untitled685-20260616014800.png",
  "https://i.postimg.cc/XvDd2B5H/Untitled685-20260616014906.png",
  "https://i.postimg.cc/W4fg9qZK/Untitled685-20260616014934.png",
  "https://i.postimg.cc/nrKstXss/Untitled685-20260616015219.png"

  "https://i.postimg.cc/85xfhqnG/Untitled6-20260707005004.png"
 "https://i.postimg.cc/Px0vmBFk/Untitled6-20260707005045.png"
 "https://i.postimg.cc/xCBNKWFY/Untitled6-20260707005108.png"
 "https://i.postimg.cc/tT8nhLmj/Untitled6-20260707005319.png"
 "https://i.postimg.cc/63F4dD1B/Untitled6-20260707005423.png"
 "https://i.postimg.cc/j5BnzGkx/Untitled6-20260707005530.png"
 "https://i.postimg.cc/NMZ21WP0/Untitled6-20260707005552.png"
 "https://i.postimg.cc/DZR4qtYZ/Untitled6-20260707005841.png"

 

];

// Loaded Image objects
const loadedImages = [];
let loadedCount = 0;

// Preload function
itemImages.forEach((src, index) => {
  const img = new Image();

  img.onload = () => {
    loadedCount++;
    if (loadedCount === itemImages.length) {
      assetsLoaded = true;
      startButton.disabled = false;
      startButton.innerText = "Start Game";
      console.log("All images loaded");
    }
  };

  img.src = src;
  loadedImages[index] = img;
});

// Disable start until ready
startButton.disabled = true;
startButton.innerText = "Loading...";

// ----------------------
// BAG IMAGE
// ----------------------
const bagImage = new Image();
bagImage.src = "https://i.postimg.cc/L6tyN9Yn/E21ECC5D-CB7F-44DF-B1DE-4A4C60A72F25.png";

// ----------------------
// BACKGROUND
// ----------------------
const backgroundImage = new Image();
backgroundImage.src = "https://i.postimg.cc/Kv0ymNzx/26A44A23-C089-472B-8F0B-1692F127D924.png";

// ----------------------
// INPUT
// ----------------------
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") rightPressed = false;
  if (e.key === "ArrowLeft") leftPressed = false;
});

// ----------------------
// TOUCH
// ----------------------
let touchOffsetX = 0;

canvas.addEventListener("touchstart", (e) => {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  touchOffsetX = touchX - bagX;
});

canvas.addEventListener("touchmove", (e) => {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  bagX = touchX - touchOffsetX;

  if (bagX < 0) bagX = 0;
  if (bagX > canvasWidth - bagWidth) bagX = canvasWidth - bagWidth;
});

// ----------------------
// GAME FUNCTIONS
// ----------------------

function createItem() {
  const x = Math.random() * (canvasWidth - itemWidth);
  const index = Math.floor(Math.random() * loadedImages.length);

  items.push({
    x,
    y: -itemHeight,
    imgIndex: index
  });
}

function moveItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].y += itemSpeed;

    if (
      items[i].y + itemHeight >= bagY &&
      items[i].x < bagX + bagWidth &&
      items[i].x + itemWidth > bagX
    ) {
      items.splice(i, 1);
      score++;
      i--;
    } 
    else if (items[i].y > canvasHeight) {
      items.splice(i, 1);
      missedItems++;
      i--;
    }
  }
}

function moveBag() {
  if (rightPressed && bagX < canvasWidth - bagWidth) bagX += 7;
  if (leftPressed && bagX > 0) bagX -= 7;
}

function checkGameOver() {
  if (missedItems >= maxMisses) {
    isGameRunning = false;
    alert(`Some Ponies got away! You collected ${score} models :)`);
    location.reload();
  }
}

// ----------------------
// DRAWING
// ----------------------

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
}

function drawBag() {
  ctx.drawImage(bagImage, bagX, bagY, 111, 83);
}

function drawItems() {
  items.forEach(item => {
    ctx.drawImage(
      loadedImages[item.imgIndex],
      item.x,
      item.y,
      itemWidth,
      itemHeight
    );
  });
}

function drawHUD() {
  ctx.fillStyle = "white";
  ctx.font = "17px Oswald";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Missed: ${missedItems}/${maxMisses}`, 10, 40);
}

function drawLoading() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Loading Breyer models...", 20, 60);
}

// ----------------------
// LOOP
// ----------------------

function gameLoop() {
  if (!isGameRunning) return;

  drawBackground();

  if (!assetsLoaded) {
    drawLoading();
    requestAnimationFrame(gameLoop);
    return;
  }

  drawBag();
  drawItems();
  drawHUD();

  moveBag();
  moveItems();
  checkGameOver();

  requestAnimationFrame(gameLoop);
}

// ----------------------
// START GAME
// ----------------------

let itemCreationInterval;
let speedIncreaseInterval;

function startGame() {
  if (!assetsLoaded) return;

  isGameRunning = true;

  items.length = 0;
  score = 0;
  missedItems = 0;
  bagX = (canvasWidth - bagWidth) / 2;

  clearInterval(itemCreationInterval);
  clearInterval(speedIncreaseInterval);

  itemSpeed = 3;

  itemCreationInterval = setInterval(createItem, 1000);
  speedIncreaseInterval = setInterval(() => {
    itemSpeed += 0.4;
  }, 5000);

  gameLoop();
}

// ----------------------
// MODAL
// ----------------------

function openGameModal() {
  gameModal.style.display = "block";

 // Prevent page scrolling
  document.body.style.overflow = "hidden";
 
  startGame();
}

function closeGameModal() {
// Re-enable page scrolling
  document.body.style.overflow = "";
 
  gameModal.style.display = "none";
  location.reload();
}

startButton.addEventListener("click", openGameModal);
closeButton.addEventListener("click", closeGameModal);

window.addEventListener("click", (e) => {
  if (e.target === gameModal) closeGameModal();
});
