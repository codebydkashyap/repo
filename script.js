// script.js — handles Yes/No flow, modals, hearts & confetti

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heartBtn     = document.getElementById('heartBtn');
  const yesBtn       = document.getElementById('yesBtn');
  const noBtn        = document.getElementById('noBtn');
  const noModal      = document.getElementById('noModal');
  const noModalYes   = document.getElementById('noModalYes');
  const noModalNo    = document.getElementById('noModalNo');
  const noModalTitle = document.getElementById('noModalTitle');
  const noModalText  = document.getElementById('noModalText');
  const yesModal     = document.getElementById('yesModal');
  const yesModalClose = document.getElementById('yesModalClose');

  // Sad messages + unique GIF pairs for each popup
// Sad messages + unique GIF pairs for each popup
const sadMessages = [
  { 
    title: 'Pleaseee 🥺',           
    text: 'Main promise karta hoon ki main better banunga… please mujhe maaf kar do na 🙏',        
    gif1: 'assets/dudu-dudu-cute.gif',    
    gif2: 'assets/blinking-cat-blinking.gif' 
  },
  { 
    title: 'Pretty please? 😿',     
    text: 'In cute faces ko dekho… aap kaise mana kar sakte ho? 🐱',         
    gif1: 'assets/miss-you.webp',         
    gif2: 'assets/please_man_jao.webp' 
  },
  { 
    title: 'I am really sorry! 😭',  
    text: 'Main sach mein sorry hoon… aapko manaane ke liye kuch bhi karunga 💐',              
    gif1: 'assets/munch-face.webp',       
    gif2: 'assets/bubu-dudu.webp' 
  },
  { 
    title: 'Nidhi pleaseee 🥹',     
    text: 'Aap bahut hi sweet ho… please mujhe maaf kar dijiye 🌸',  
    gif1: 'assets/hêh.webp',              
    gif2: 'assets/milk-and-mocha-cute.webp' 
  },
  { 
    title: 'Last chance? 😢',        
    text: 'Bas ek last chance de do… main poochta rahunga jab tak aap haan nahi bolte 💕',             
    gif1: 'assets/head_downing-gif.gif',  
    gif2: 'assets/akirambow-spoiled-rabbit.webp' 
  },
  { 
    title: 'I will not stop 🐻',     
    text: 'Yeh popup baar-baar aayega… please bas ek baar haan bol do 😄',       
    gif1: 'assets/peach-goma-peach-and-goma.webp', 
    gif2: 'assets/dudu-dudu-cute.gif' 
  },
];
  const noGif1 = document.getElementById('noGif1');
  const noGif2 = document.getElementById('noGif2');
  let noCount = 0;
  const RUNAWAY_AFTER = 4; // allow 4 normal "No" clicks before buttons run away
  let runawayActivated = false;

  // ────── Runaway button helper ──────
  function runawayHandler(btn) {
    return () => {
      if (!runawayActivated) return; // do nothing for first 4 clicks
      
      const container = btn.closest('.card') || btn.closest('.modal-box') || document.body;
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      
      // Calculate bounds so it stays strictly inside the parent container
      const maxX = Math.max(0, containerRect.width - btnRect.width - 20);
      const maxY = Math.max(0, containerRect.height - btnRect.height - 20);
      
      const newX = Math.max(10, Math.random() * maxX);
      const newY = Math.max(10, Math.random() * maxY);

      container.style.position = 'relative'; // Ensure containing block
      btn.style.position = 'absolute';
      btn.style.left = newX + 'px';
      btn.style.top  = newY + 'px';
      btn.style.zIndex = '9999';
      btn.style.transition = 'left 0.3s ease, top 0.3s ease';
    };
  }

  // Attach hover listeners (they only activate after 4 rejections)
  noBtn.addEventListener('mouseenter', runawayHandler(noBtn));
  noModalNo.addEventListener('mouseenter', runawayHandler(noModalNo));

  // ────── "No" button on main card ──────
  noBtn.addEventListener('click', () => {
    showNoModal();
  });

  // ────── "Still no" inside modal ──────
  noModalNo.addEventListener('click', () => {
    // Quick hide, then re-show with new message
    noModal.classList.remove('active');
    // Reset modal No button position for next popup
    noModalNo.style.position = '';
    noModalNo.style.left = '';
    noModalNo.style.top = '';
    setTimeout(() => showNoModal(), 300);
  });

  function showNoModal() {
    const msg = sadMessages[noCount % sadMessages.length];
    noModalTitle.textContent = msg.title;
    noModalText.textContent  = msg.text;
    // Swap GIFs for each popup
    noGif1.src = msg.gif1;
    noGif2.src = msg.gif2;
    noCount++;

    // After 4 rejections, activate runaway mode!
    if (noCount >= RUNAWAY_AFTER && !runawayActivated) {
      runawayActivated = true;
    }

    // Make "No" button shrink each time 😂
    const scale = Math.max(0.5, 1 - noCount * 0.08);
    noModalNo.style.transform = `scale(${scale})`;
    noModalNo.style.fontSize  = `${Math.max(0.6, 1 - noCount * 0.06)}rem`;

    // Make "Yes" button grow each time
    const yesScale = Math.min(1.5, 1 + noCount * 0.08);
    noModalYes.style.transform = `scale(${yesScale})`;

    noModal.classList.add('active');
  }

  // ────── "Yes" buttons (both main & modal) ──────
  yesBtn.addEventListener('click', showCelebration);
  noModalYes.addEventListener('click', () => {
    noModal.classList.remove('active');
    showCelebration();
  });

  function showCelebration() {
    yesModal.classList.add('active');
    launchConfetti();
  }

  // ────── Close celebration ──────
  yesModalClose.addEventListener('click', () => {
    yesModal.classList.remove('active');
  });

  // ────── Heart button — spawn floating hearts ──────
  heartBtn.addEventListener('click', () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnHeart(), i * 120);
    }
  });

  function spawnHeart() {
    const emojis = ['💖', '💕', '💗', '🌸', '✨', '💝'];
    const h = document.createElement('div');
    h.classList.add('floating-heart');
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top  = '80vh';
    document.body.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
  }

  // ────── Confetti burst ──────
  function launchConfetti() {
    const colors = ['#ff6b81','#55efc4','#fdcb6e','#a29bfe','#fd79a8','#00cec9','#e17055'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const c = document.createElement('div');
        c.classList.add('confetti');
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top  = '-10px';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.width  = (Math.random() * 8 + 6) + 'px';
        c.style.height = (Math.random() * 8 + 6) + 'px';
        c.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(c);
        c.addEventListener('animationend', () => c.remove());
      }, i * 30);
    }
  }
});
