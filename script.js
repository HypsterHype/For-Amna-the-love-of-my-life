/* script.js - integrated interactive love site for Amna */

/* -------------------------
   Data / Assets (change names if you like)
   ------------------------- */
let currentStep = 0;
const reasons = [
  "Because you make my world softer, warmer, and brighter 🌸",
  "Because your smile feels like home 💗",
  "Because your laugh could heal any sadness 💕",
  "Because you understand me like no one else ever could ✨",
  "Because every little thing about you makes me fall harder 💞",
  "Because with you, I don’t need perfection — I just need you 💫",
  "Because you’re my peace, my chaos, my forever love 💖"
];

const amnaPics = [
  { img: "amna1.jpg", caption: "My queen 👑" },
  { img: "amna2.jpg", caption: "THIS IS THE GIRL I LOVE 💖" },
  { img: "amna3.jpg", caption: "My goddess ✨" }
];

const cats = [
  { img: "cat-love.gif", text: "I love you sooo much 🐾" },
  { img: "cat-cute.gif", text: "You found me! You’re my favorite 💞" },
  { img: "cat-sign.gif", text: "I ❤️ You, Amna!" },
  { img: "cat-kiss.gif", text: "Sending you kisses 😽" },
  { img: "cat-heart.gif", text: "My heart belongs to you 💗" }
];

/* -------------------------
   State flags
   ------------------------- */
let heartsStarted = false;
let finalTextStarted = false;
let musicStarted = false;

/* -------------------------
   Helper DOM
   ------------------------- */
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const imageContainer = document.getElementById('image-container');
const heartsContainer = document.getElementById('hearts');
const popupsContainer = document.getElementById('popups');
const musicEl = document.getElementById('bg-music');

/* -------------------------
   Start the love story (user interaction begins here)
   ------------------------- */
function startLoveStory(){
  // start the music on first intentional click (user gesture)
  if(!musicStarted){
    try{ musicEl.volume = 0.28; musicEl.play(); }catch(e){}
    musicStarted = true;
  }

  questionEl.innerText = "I love you so much because...";
  const startBtn = document.getElementById('start-button');
  startBtn.innerText = "Next reason 👉";
  startBtn.onclick = showReasons;
  // ensure a single easter button will be created when page shows reasons
}

/* -------------------------
   Show reasons (page-by-page)
   ------------------------- */
function showReasons(){
  clearEasterButton();
  imageContainer.innerHTML = ""; // clear previous picture if any

  if(currentStep < reasons.length){
    // show reason text
    questionEl.innerText = reasons[currentStep];

    // subtle hearts
    createHearts(3);

    // create a single hidden easter button per page
    createEasterButton();

    // show a picture on some pages (for variety: show on steps 1,3,5 -> odd indexes)
    if(currentStep % 2 === 0 && amnaPics[Math.floor(currentStep/2)]){
      const p = amnaPics[Math.floor(currentStep/2)];
      imageContainer.innerHTML = `
        <div class="photo-box fade">
          <img src="${p.img}" alt="Amna" class="amna-photo">
          <div class="photo-caption">${p.caption}</div>
          <div class="photo-arrow"></div>
        </div>`;
    }

    currentStep++;
  } else {
    // all reasons shown -> special page
    showSpecialPage();
  }
}

/* -------------------------
   Easter button (single per page)
   ------------------------- */
function createEasterButton(){
  // ensure only one exists at a time
  clearEasterButton();

  const btn = document.createElement('button');
  btn.className = 'easter-btn';
  btn.innerText = '💖';
  // random-ish near edges so it's slightly hidden but findable
  const left = Math.random() * 80 + 5; // 5vw .. 85vw
  const top = Math.random() * 70 + 8;  // 8vh .. 78vh
  btn.style.left = left + 'vw';
  btn.style.top = top + 'vh';
  btn.onclick = (e) => {
    e.stopPropagation();
    showRandomCatPopup();
    // disappear after clicking so not to spam
    btn.remove();
  };
  document.body.appendChild(btn);
}

function clearEasterButton(){
  document.querySelectorAll('.easter-btn').forEach(el => el.remove());
}

/* -------------------------
   Cat popup (random pick)
   ------------------------- */
function showRandomCatPopup(){
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.style.left = (10 + Math.random() * 70) + 'vw';
  popup.style.top = (10 + Math.random() * 65) + 'vh';
  popup.innerHTML = `<div class="popup-text">${cat.text}</div>
                     <img src="${cat.img}" alt="Cute cat">`;
  popupsContainer.appendChild(popup);
  // remove when animation finishes
  setTimeout(()=> popup.remove(), 2800);
}

/* -------------------------
   Special page with runaway No button
   ------------------------- */
function showSpecialPage(){
  clearEasterButton();
  imageContainer.innerHTML = "";

  questionEl.innerText = "Wanna see something special? 💝";
  optionsEl.innerHTML = `
    <button id="yes-button" onclick="showFinalPage()">Yes 💞</button>
    <button id="no-button" onmouseover="moveNoButton()" onclick="moveNoButton()">No 😔</button>
  `;
  // create a playful tiny easter button on special page too
  createEasterButton();
}

/* Move "No" to random positions (mouseover & click) */
function moveNoButton(){
  const noBtn = document.getElementById('no-button');
  if(!noBtn) return;
  // Try to avoid placing off-screen: compute small margins
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 80);
  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  // occasionally spawn a tiny teasing popup near it
  if(Math.random() < 0.35) showTinyTease(noBtn);
}

/* tiny teasing tooltip near the no button */
function showTinyTease(anchor){
  const rect = anchor.getBoundingClientRect();
  const msg = document.createElement('div');
  msg.className = 'popup-text-floating';
  msg.style.left = Math.max(8, rect.left - 20) + 'px';
  msg.style.top = Math.max(8, rect.top - 46) + 'px';
  msg.innerText = "Are you sure? 💕";
  document.body.appendChild(msg);
  setTimeout(()=> msg.remove(), 1800);
}

/* -------------------------
   Final page
   ------------------------- */
function showFinalPage(){
  clearEasterButton();
  optionsEl.style.display = 'none';
  imageContainer.innerHTML = `<img src="cat-heart.gif" alt="Cat Heart" style="width:210px;border-radius:12px;box-shadow:0 12px 30px rgba(255,110,155,0.18);">`;

  questionEl.innerHTML = `Amna, you are my everything — my best decision, my soft place to fall, my reason to smile every day. 💖<br><br>I’ll love you endlessly, forever and always. 🌹`;
  // start background hearts and floating love texts
  if(!heartsStarted){ startHearts(); heartsStarted = true; }
  if(!finalTextStarted){ floatingLoveText(); finalTextStarted = true; }
  // also add a final easter button for celebration
  createEasterButton();
}

/* -------------------------
   Floating hearts generator
   ------------------------- */
function startHearts(){
  // make hearts periodically
  const interval = setInterval(()=>{
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() < 0.5 ? '💖' : '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (14 + Math.random() * 26) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 4) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(()=> heart.remove(), 7000);
  }, 300);
}

/* -------------------------
   Floating final love text (subtle)
   ------------------------- */
function floatingLoveText(){
  setInterval(()=>{
    const txt = document.createElement('div');
    txt.className = 'popup-text-floating';
    txt.style.left = (6 + Math.random() * 72) + 'vw';
    txt.style.top = (8 + Math.random() * 72) + 'vh';
    txt.innerText = "I’ll always love you, Amna 💗";
    document.body.appendChild(txt);
    setTimeout(()=> txt.remove(), 3000);
  }, 3600);
}

/* -------------------------
   Extra: small gentle hearts while reading reasons
   ------------------------- */
function createHearts(count=3){
  for(let i=0;i<count;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() < 0.5 ? '💗' : '💖';
    heart.style.left = (Math.random() * 100) + 'vw';
    heart.style.fontSize = (12 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (2 + Math.random() * 3) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(()=> heart.remove(), 4200);
  }
}

/* -------------------------
   Accessibility: allow keyboard to press Yes to start
   ------------------------- */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && !musicStarted){
    // simulate start click once user presses Enter first time
    const startBtn = document.getElementById('start-button');
    if(startBtn) startBtn.click();
  }
});

/* -------------------------
   Prevent accidental selection drags; small UX tweaks
   ------------------------- */
document.addEventListener('dragstart', e => e.preventDefault());
