let closePlayer = document.querySelector('#close-player');
let musicPlayer = document.querySelector('.music-player');
let boxContainer = document.querySelector('.container .box-container');
let audio = musicPlayer.querySelector('audio');


closePlayer.onclick = () =>{
    closePlayer.classList.toggle('fa-times');
    musicPlayer.classList.toggle('active');
    boxContainer.classList.toggle('active');   
}

let boxes = document.querySelectorAll('.container .box-container .box');
let playlist = Array.from(boxes).map(box => ({
    src: box.getAttribute('data-src'),
    title: box.querySelector('.content h3').innerText
}));

let currentIndex = 0;
let isRepeat = false;
let isShuffle = false;

// Toggle player visibility
closePlayer.onclick = () => {
    closePlayer.classList.toggle('fa-times');
    musicPlayer.classList.toggle('active');
    boxContainer.classList.toggle('active');   
};

// Load and play track by index
function playTrack(index) {
    currentIndex = index;
    musicPlayer.querySelector('h3').innerText = playlist[index].title;
    audio.src = playlist[index].src;
    audio.play();
}


boxes.forEach((box, index) => {
    box.onclick = () => {
        let src = box.getAttribute('data-src');
        let text = box.querySelector('.content h3').innerText;
        closePlayer.classList.add('fa-times');
        musicPlayer.classList.add('active');
        boxContainer.classList.add('active');
        musicPlayer.querySelector('h3').innerText = text;
        musicPlayer.querySelector('audio').src = src;
        musicPlayer.querySelector('audio').play();
        closePlayer.classList.add('fa-times');
        musicPlayer.classList.add('active');
        boxContainer.classList.add('active');
        playTrack(index);
    };
});

// Buttons
document.getElementById('repeatButton').onclick = () => {
    isRepeat = !isRepeat;
    alert(`Repeat is now ${isRepeat ? 'ON' : 'OFF'}`);
};
    
document.getElementById('shuffleButton').onclick = () => {
    isShuffle = !isShuffle;
    alert(`Shuffle is now ${isShuffle ? 'ON' : 'OFF'}`);
};
    
// When track ends
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else if (isShuffle) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentIndex);
        playTrack(nextIndex);
    } else {
        let nextIndex = (currentIndex + 1) % playlist.length;
        playTrack(nextIndex);
    }
});
