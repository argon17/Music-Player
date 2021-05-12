const musicContainer = document.getElementById('music-container');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const pointer = document.getElementById('pointer');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');
const author = document.getElementById('author');

const songs = ['Color White', 'Pariah', 'Laude Lag Gaye' ];
const singers = ['Parvaaz', 'Steven Wilson, Ninet Tayeb', 'BCS Ragasur'];

const cTime = document.getElementById('current-time');
const tTime = document.getElementById('total-time');
const time = document.getElementById('time');

const checkBox = document.getElementById('check');
const checkBox1 = document.getElementById('checkl');
const head = document.getElementById('h1');
const imgShadow = document.getElementById('img-shadow');
const body = document.body;


let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song){
    cTime.innerText = "0:00";
    tTime.innerText = "0:00";
    title.innerText = song;
    author.innerText = singers[songIndex];
    audio.src = `audios/${song}.mp3`;
    cover.src = `imgs/${song}.jpg`;
}
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}
function prevSong(){
    songIndex= 1- songIndex;
    loadSong(songs[songIndex]);
    musicContainer.classList.add('play');
    audio.play();
    
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}
function nextSong(){
    songIndex= 1- songIndex;
    loadSong(songs[songIndex]);
    musicContainer.classList.add('play');
    audio.play();

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}


function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;

    cTime.innerText = `${Math.floor(currentTime/60)}:${twoDig(Math.floor(currentTime%60))}`;
    tTime.innerText = `${Math.floor(duration/60)}:${twoDig(Math.floor(duration%60))}`;
}
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}
function twoDig(n){
    return n > 9 ? "" + n: "0" + n;
}
function stateChange(){

    body.classList.toggle('dark-mode');
    musicContainer.classList.toggle('dark-mode');
    title.classList.toggle('dark-mode');
    author.classList.toggle('dark-mode');
    time.classList.toggle('dark-mode');
    checkBox1.classList.toggle('dark-mode');
    head.classList.toggle('dark-mode');
    playBtn.classList.toggle('dark-mode');
    imgShadow.classList.toggle('dark-mode');
    progress.classList.toggle('dark-mode');
    progressContainer.classList.toggle('dark-mode');

    
    /*if(checkBox.checked){
        document.body.style.backgroundColor = "#b6ccf0";
        document.body.color = "white";
        checkBox1.style.backgroundColor = "#222831";
        musicContainer.style.backgroundColor = "#ccddf5";
        head.style.color = "black";
        playBtn.style.background = "#b6ccf0";
        imgShadow.style.borderColor = "#b6ccf0";
        title.style.color = "black";
        author.style.color = "black";
        time.style.color = "black";

    }else{/* dark mode 
        document.body.style.backgroundColor = "#222831";
        document.body.color = "white";
        checkBox1.style.backgroundColor = "#b6ccf0";
        musicContainer.style.backgroundColor = "#2d4059";
        head.style.color = "white";
        playBtn.style.background = "#222831";
        imgShadow.style.borderColor = "#222831";
        title.style.color = "white";
        author.style.color = "white";
        time.style.color = "white";
        checkBox.pseudoStyle("before", "transform", "translateX(30px)");
    }*/
}
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coords;
  }
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

checkBox.addEventListener('change', stateChange);
