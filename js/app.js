document.addEventListener('DOMContentLoaded', () => {
    const app = () => {

        const audio = document.querySelector('.audio');
        const play = document.querySelector('.play');
        const outline = document.querySelector('.moving-outline circle');
        const video = document.querySelector('.vid-container video');
        // Sounds
        const sounds = document.querySelectorAll('.sound-picker button');
        // Time-display
        const timeDisplay = document.querySelector('.time-display');
        const timeSelect = document.querySelectorAll('.time-select button')
        // Get the length of the outline
        const outlineLength = outline.getTotalLength();
        console.log(outlineLength);
        // Duration 
        let fakeDuration = 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

        // Select different sounds

        sounds.forEach(sound => {
            sound.addEventListener('click', function () {
                audio.src = this.getAttribute('data-sound')
                video.src = this.getAttribute('data-video')
                checkPlaying(audio);
            })
        })

        // Play sound
        play.addEventListener('click', () => {
            checkPlaying(audio);
        })

        // Select time

        timeSelect.forEach(option => {
            option.addEventListener('click', function () {
                fakeDuration = this.getAttribute('data-time');
                timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${fakeDuration % 60}`
            })
        })

        // Create a function specific to stop and play the sounds
        const checkPlaying = audio => {
            if (audio.paused) {
                audio.play();
                video.play();
                play.src = './img/pause.svg'
            } else {
                audio.pause();
                video.pause();
                play.src = './img/play.svg'
            }
        }

        // Animate the timer
        audio.ontimeupdate = () => {
            // preparations
            let currentTime = audio.currentTime;
            let elapsed = fakeDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);

            // circle animation
            let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;
            // text animation
            timeDisplay.textContent = `${minutes}: ${seconds}`;

            if (currentTime >= fakeDuration) {
                audio.pause();
                audio.currentTime = 0;
                play.src = './img/play.svg'
                video.pause();
            }
        }

    }

    app();

})