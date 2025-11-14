const currentTimeElement = document.getElementById('currentTime');
const currentDateElement = document.getElementById('currentDate');

function getCurrentIST() {
    const now = new Date();
    
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (5.5 * 60 * 60000));
    
    return istTime;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-IN', options);
}

function updateTime() {
    const istTime = getCurrentIST();
    
    const hours = formatTime(istTime.getHours());
    const minutes = formatTime(istTime.getMinutes());
    const seconds = formatTime(istTime.getSeconds());
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = formatDate(istTime);
    
    currentTimeElement.textContent = timeString;
    currentDateElement.textContent = dateString;
}

updateTime();
setInterval(updateTime, 1000);

const mainImage = document.getElementById('mainImage');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');
const infoPanel = document.getElementById('infoPanel');

let currentScale = 1;
let isInfoVisible = true;

zoomInBtn.addEventListener('click', function() {
    currentScale += 0.1;
    mainImage.style.transform = `scale(${currentScale})`;
});

zoomOutBtn.addEventListener('click', function() {
    if (currentScale > 0.5) {
        currentScale -= 0.1;
        mainImage.style.transform = `scale(${currentScale})`;
    }
});

resetBtn.addEventListener('click', function() {
    currentScale = 1;
    mainImage.style.transform = 'scale(1)';
});

infoBtn.addEventListener('click', function() {
    if (isInfoVisible) {
        infoPanel.style.display = 'none';
        infoBtn.textContent = 'Show Info';
    } else {
        infoPanel.style.display = 'block';
        infoBtn.textContent = 'Hide Info';
    }
    isInfoVisible = !isInfoVisible;
});

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '+':
            currentScale += 0.1;
            mainImage.style.transform = `scale(${currentScale})`;
            break;
        case '-':
            if (currentScale > 0.5) {
                currentScale -= 0.1;
                mainImage.style.transform = `scale(${currentScale})`;
            }
            break;
        case '0':
            currentScale = 1;
            mainImage.style.transform = 'scale(1)';
            break;
        case 'i':
            infoBtn.click();
            break;
        case 't':
            const istTime = getCurrentIST();
            console.log('Current IST:', istTime.toLocaleString());
            break;
    }
});

mainImage.addEventListener('error', function() {
    console.error('Failed to load the image');
    mainImage.alt = 'Image failed to load';
    
    const placeholder = document.createElement('div');
    placeholder.style.width = '100%';
    placeholder.style.height = '400px';
    placeholder.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.color = 'white';
    placeholder.style.fontSize = '1.2rem';
    placeholder.innerHTML = 'Image Placeholder<br><small>Original image failed to load</small>';
    
    mainImage.parentNode.replaceChild(placeholder, mainImage);
});

mainImage.addEventListener('load', function() {
    console.log('Image loaded successfully');
});

console.log('Indian Standard Time (IST) Display initialized');
console.log('IST is UTC+5:30 and does not observe daylight saving time');

console.log('Interactive Image with IST Time initialized');