document.getElementById("btn-contact").addEventListener("click", () => {
    window.open("https://t.me/aqatx", "_blank");
});

document.getElementById("btn-bio").addEventListener("click", () => {
    window.open("https://t.me/nauhty_bio", "_blank");
});

document.getElementById("btn-reviews").addEventListener("click", () => {
    window.open("https://t.me/nauhty_price", "_blank");
});
 
let typingSpeed = 40;
const GLITCH_CHANCE = 0.06;
const GLITCH_REPLACE_MS = Math.max(20, Math.floor(typingSpeed / 2));
const texts = [
  "OSINT | DEF | FIZ | MANUALS | CEO | YOBIR",
  "WANNA HELP? DM ME"
];
const terminal = document.querySelector('.terminal');
const cursor = document.querySelector('.cursor');
const buttons = document.querySelector('.buttons');
const h1 = document.querySelector('h1');

const audio = document.getElementById('bg-audio');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volume-slider');
const progressEl = document.querySelector('.audio-track .progress');
const audioTrack = document.getElementById('audioTrack');

let audioStarted = false;
let targetVolume = parseFloat(volumeSlider.value) || 0.75;
audio.volume = targetVolume;

function typeText(index = 0) {
  if (index >= texts.length) {
    buttons.classList.add('show');
    h1.classList.add('glow');
    document.querySelector('.audio-box').classList.add('show');
    return;
  }

  const text = texts[index];
  const line = document.createElement('span');
  terminal.insertBefore(line, cursor);

  let i = 0;
  function step() {
    if (i < text.length) {
      const ch = text.charAt(i);
      if (Math.random() < GLITCH_CHANCE) {
        const g = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        line.textContent += g;
        setTimeout(() => {
          line.textContent = line.textContent.slice(0, -1) + ch;
        }, GLITCH_REPLACE_MS);
      } else line.textContent += ch;
      i++;
      setTimeout(step, typingSpeed);
    } else {
      if (index < texts.length - 1) terminal.insertBefore(document.createElement('br'), cursor);
      typeText(index + 1);
    }
  }
  step();
}

typeText();

document.body.addEventListener('click', ()=>{
  if(!audioStarted){audio.play().catch(()=>{});audioStarted=true;}
}, {once:true});

volumeSlider.addEventListener('input', e=>{
  targetVolume=parseFloat(e.target.value);
  audio.volume = targetVolume;
});

muteBtn.addEventListener('click', ()=>{
  if(audio.volume>0.005){
    audio.volume=0;
    muteBtn.textContent='UNMUTE';
  }else{
    audio.volume=targetVolume;
    muteBtn.textContent='MUTE';
  }
});

audio.addEventListener('timeupdate', ()=>{
  if(!audio.duration || isNaN(audio.duration)) return;
  const pct = (audio.currentTime/audio.duration)*100;
  progressEl.style.width = pct+'%';
  audioTrack.setAttribute('aria-valuenow', Math.round(pct));
});

audioTrack.addEventListener('click', e=>{
  if(!audio.duration) return;
  const rect = audioTrack.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = x/rect.width;
  audio.currentTime = pct*audio.duration;
});

async function openBackendLink(endpoint){
  try{
    const resp=await fetch(endpoint);
    const url=(await resp.text()).trim();
    const final=url.startsWith('http')?url:('https://'+url);
    window.open(final,'_blank');
  }catch(e){}
}

document.getElementById('btn-contact').addEventListener('click',()=>openBackendLink('/api/link/contact'));
document.getElementById('btn-bio').addEventListener('click',()=>openBackendLink('/api/link/bio'));
document.getElementById('btn-reviews').addEventListener('click',()=>openBackendLink('/api/link/reviews'));