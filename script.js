const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
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

function displayTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime*100}%`;
    video.currentTime = newTime * video.duration;   


}


// Volume Controls --------------------------- //


let lastVolume = 1;

function changeVolumeIcon(volume) {
    if (volume > 0.40) {
        volumeIcon.className = '';
        volumeIcon.classList.add('fas', 'fa-volume-up');
      } else if (volume < 0.40 && volume > 0) {
        volumeIcon.className = '';
        volumeIcon.classList.add('fas', 'fa-volume-down');
      } else if (volume === 0) {
        volumeIcon.className = '';
        volumeIcon.classList.add('fas', 'fa-volume-off');
      }
}

function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume*100}%`;
    if (volume < .1) {volume = 0}
    if (volume > .9) {volume = 1}
    video.volume = volume;
    changeVolumeIcon(volume);
    lastVolume = volume;
}


function toggleMute() {
    volumeIcon.className = '';
    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title','Unmute' );


    }else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;        
        changeVolumeIcon(video.volume);
    }

}


// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
//  View in fullscreen /
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  //add class to element to invoke css
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
   //remove class from element to invoke css
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
      openFullscreen(player);
    } else {
      closeFullscreen();
    }
    fullscreen = !fullscreen;
  }
  


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon );
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress );
video.addEventListener('dblclick', toggleFullscreen );
progressRange.addEventListener('click', setProgress );
volumeRange.addEventListener('click', changeVolume );
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);