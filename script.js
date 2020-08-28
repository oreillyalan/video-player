const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range'); 
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range'); 
const volumeBar = document.querySelector('.volume-bar');
const timeElapsed = document.querySelector('.time-elapsed'); 
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.time-duration'); 
const fullscreenBtn = document.querySelector('.fullscreen');


// Event Handlers

function showPlayIcon() {
    playBtn.classList.replace('fa-pause-circle','fa-play-circle' );
    playBtn.setAttribute('title','Play' ); 
}

// Play & Pause ----------------------------------- //
function togglePlay(){
    if(video.paused) {
        video.play();
        playBtn.classList.replace('fa-play-circle','fa-pause-circle' );
        playBtn.setAttribute('title','Pause' );

    } else{ 
        showPlayIcon();
        video.pause() ;
   }
}

// Progress Bar ---------------------------------- //
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
}


// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //





// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon );
video.addEventListener('timeupdate', updateProgress );
video.addEventListener('canplay', updateProgress );
