// import fetch_songs from './queries'

const titles = [], authors = [], urls = [], thumbnails = [];

async function fetch_songs(){

    const GET_SONGS_DATA = `query getSongs {
        songs(order_by: {created_at: desc}) {
            artist
            created_at
            duration
            id
            thumbnail
            title
            url
        }
        }`

    const options = {
        method: "post",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        query: GET_SONGS_DATA
        })
    };

    await fetch("https://argon-music-database.herokuapp.com/v1/graphql", options)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                data.data.songs.map((song, index)=>{
                    titles.push(song.title)
                    authors.push(song.artist)
                    urls.push(song.url)
                    thumbnails.push(song.thumbnail)
                })
                // console.log(titles, authors, urls, thumbnails)

            });
}
fetch_songs();
loadSong(songIndex);

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

const cTime = document.getElementById('current-time');
const tTime = document.getElementById('total-time');
const time = document.getElementById('time');

const checkBox = document.getElementById('check');
const checkBox1 = document.getElementById('checkl');
const head = document.getElementById('h1');
const imgShadow = document.getElementById('img-shadow');
const body = document.body;


let songIndex = 0;

function loadSong(songIndex){

    cTime.innerText = "0:00";
    tTime.innerText = "0:00";
    title.innerText = titles[songIndex];
    author.innerText = authors[songIndex];
    audio.src = urls[songIndex];
    cover.src = thumbnails[songIndex];

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

    songIndex = songIndex == 0 ? titles.length-1 : songIndex-1;
    loadSong(songIndex);
    musicContainer.classList.add('play');
    audio.play();
    
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}

function nextSong(){
    songIndex = songIndex == titles.length-1 ? 0 : songIndex+1;
    loadSong(songIndex);
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
