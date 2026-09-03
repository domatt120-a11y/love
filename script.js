// =============================
// عدل القيم دي براحتك ❤️
// =============================
const CORRECT_PASSWORD = "9122024";
const HER_NAME = "Nona";
const BIRTH_DATE = "2006-09-23";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const noBtn = $("#noBtn"), loveBtn = $("#loveBtn"), choiceArea = $("#choiceArea"), escapeHint = $("#escapeHint"), toast = $("#toast");
let escapeCount = 0;
const noTexts = ["متأكدة؟ 😏","لأ بجد؟ 😂","أنتِ مصممة؟","يا بنتي ده أنا بحبك 😭","طب سيبك من الزرار ده 😂","مش هتعرفي تدوسيه أصلًا 👀","خلاص كده أنا زعلت... بهزار ❤️"];

function moveNoButton(){
  const areaRect=choiceArea.getBoundingClientRect(),btnRect=noBtn.getBoundingClientRect();
  const maxX=Math.max(12,areaRect.width-btnRect.width-12),maxY=Math.max(12,areaRect.height-btnRect.height-12);
  noBtn.style.left=`${12+Math.random()*Math.max(0,maxX-12)}px`;noBtn.style.top=`${8+Math.random()*Math.max(0,maxY-8)}px`;noBtn.style.transform="none";
  noBtn.textContent=noTexts[Math.min(escapeCount,noTexts.length-1)];escapeCount++;escapeHint.textContent=`محاولة هروب رقم ${escapeCount}... ومفيش فايدة 😂`;
}
["mouseenter","pointerdown","touchstart"].forEach(ev=>noBtn.addEventListener(ev,e=>{e.preventDefault();moveNoButton();},{passive:false}));
loveBtn.addEventListener("click",()=>{burstHearts(14);showToast("كنت عارف إنك هتختاري الصح 😂❤️");setTimeout(()=>switchScreen("loveStep","passwordStep"),850)});
function switchScreen(fromId,toId){$("#"+fromId).classList.remove("active");setTimeout(()=>{$("#"+toId).classList.add("active");window.scrollTo({top:0,behavior:"instant"})},120)}

const passwordInput=$("#passwordInput"),unlockBtn=$("#unlockBtn"),passwordError=$("#passwordError"),togglePassword=$("#togglePassword");
togglePassword.addEventListener("click",()=>{const p=passwordInput.type==="password";passwordInput.type=p?"text":"password";togglePassword.textContent=p?"🙈":"👁"});
function unlock(){const value=passwordInput.value.trim().replace(/[\\/\-. ]/g,"");if(value===CORRECT_PASSWORD){$(".hero h2 span").textContent=`Birthday, ${HER_NAME} ♡`;switchScreen("passwordStep","mainStep");burstHearts(22);showToast("أهو كده دخلنا عالمنا ✨");maybePlayMusic()}else{passwordError.textContent="مممم... التاريخ ده مش هو اللي بندور عليه 😏❤️";passwordInput.animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:320})}}
unlockBtn.addEventListener("click",unlock);passwordInput.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});

// شريط حياة + progress للموقع
const lifeLine=$("#lifeLine"),lifeProgress=$("#lifeProgress"),lifeEvents=$$(".life-event"),pageProgress=$("#pageProgress");
function updateScrollEffects(){
  if(lifeLine&&lifeProgress){const rect=lifeLine.getBoundingClientRect(),center=innerHeight*.55;const progress=Math.min(Math.max((center-rect.top)/rect.height,0),1);lifeProgress.style.height=`${progress*100}%`;lifeEvents.forEach((event,i)=>{const r=event.getBoundingClientRect(),active=r.top<center;event.classList.toggle("reached",active);if(active)event.style.setProperty("--delay",`${i*70}ms`)})}
  if(pageProgress){const doc=document.documentElement;pageProgress.style.width=`${(scrollY/(doc.scrollHeight-innerHeight))*100}%`}
}
addEventListener("scroll",updateScrollEffects,{passive:true});addEventListener("resize",updateScrollEffects);updateScrollEffects();
$("#startJourney").addEventListener("click",()=>document.querySelector(".story-section").scrollIntoView({behavior:"smooth"}));

// رسالة إضافية بحروف تظهر تدريجيًا
const extraLines=["وأكتر حاجة بحبها فيكي؟","إنك بتخلي الضحكة تيجي في وقتها بالظبط.","وعشان كده... عيد ميلاد سعيد يا نونتي ❤️"];
let lineIndex=0;$("#revealLetterBtn").addEventListener("click",()=>{if(lineIndex>=extraLines.length){showToast("خلاص كفاية دلع بقى 😂❤️");return}const p=$("#typewriterText");const next=extraLines[lineIndex++];let i=0;p.textContent="";const timer=setInterval(()=>{p.textContent+=next[i++]||"";if(i>next.length)clearInterval(timer)},28);if(lineIndex===extraLines.length)$("#revealLetterBtn").textContent="وصلنا للجزء الحلو ❤️"});

// حساب عدد الأيام من الميلاد حتى النهارده
const birth=new Date(`${BIRTH_DATE}T00:00:00`);const days=Math.floor((new Date()-birth)/86400000);if(days>0)$("#daysAlive").textContent=days.toLocaleString("en-US");

// Gallery modal
const modal=$("#photoModal"),modalImg=$("#modalImg"),modalCaption=$("#modalCaption");$$(".photo-card").forEach(card=>card.addEventListener("click",()=>{modalImg.src=card.dataset.img;modalCaption.textContent=card.dataset.caption;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}$("#modalClose").addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target.dataset.close)closeModal()});

// شمعة الأمنيات
$("#candleBtn").addEventListener("click",()=>{const card=$("#wishCard");card.classList.toggle("wished");$("#candleBtn").classList.add("off");burstHearts(12);showToast("الأمنية اتقفلت في القلب 🤍✨")});

// Quiz
$$("#quizOptions button").forEach(btn=>btn.addEventListener("click",()=>{const result=$("#quizResult");if(btn.dataset.answer==="b"){result.textContent="إجابة نموذجية يا نونة 😂❤️ خدتي 10/10.";burstHearts(8)}else if(btn.dataset.answer==="c"){result.textContent="إجابة دبلوماسية... هنعديهالك 😂"}else{result.textContent="غلط! الموقع نفسه شهد إن أدهم بيحبك أكتر 😭❤️"}}));

// مفاجأة نهائية
$("#finalGiftBtn").addEventListener("click",()=>{$("#finalPopup").classList.add("open");$("#finalPopup").setAttribute("aria-hidden","false");burstHearts(45);playCelebration()});$("#closeFinal").addEventListener("click",()=>{$("#finalPopup").classList.remove("open");$("#finalPopup").setAttribute("aria-hidden","true")});$("#surpriseBtn").addEventListener("click",()=>{burstHearts(25);showToast("دي مجرد عينة... المفاجأة الحقيقية في الآخر 👀🎁");document.querySelector(".story-section").scrollIntoView({behavior:"smooth"})});

// الموسيقى: المتصفح يحتاج تفاعل، لذلك نبدأ بعد الضغط
const bgMusic=$("#bgMusic"),musicToggle=$("#musicToggle");let musicOn=false;
async function maybePlayMusic(){if(!bgMusic)return;try{await bgMusic.play();musicOn=true;musicToggle.innerHTML="🔊 <span>موسيقى ON</span>"}catch{showToast("حطي birthday-song.mp3 جنب الملفات عشان الموسيقى تشتغل 🎵")}}
musicToggle.addEventListener("click",async()=>{if(musicOn){bgMusic.pause();musicOn=false;musicToggle.innerHTML="♫ <span>موسيقى</span>"}else await maybePlayMusic()});

function burstHearts(count=12){const layer=$("#heartsLayer");for(let i=0;i<count;i++){const heart=document.createElement("span");heart.className="floating-heart";heart.textContent=["♥","♡","✦","❤"][Math.floor(Math.random()*4)];heart.style.left=`${Math.random()*100}%`;heart.style.top=`${55+Math.random()*40}%`;heart.style.setProperty("--drift",`${(Math.random()-.5)*220}px`);heart.style.animationDuration=`${1.8+Math.random()*1.5}s`;layer.appendChild(heart);setTimeout(()=>heart.remove(),3600)}}
function playCelebration(){let n=0;const timer=setInterval(()=>{burstHearts(8);if(++n>=7)clearInterval(timer)},280)}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2400)}
