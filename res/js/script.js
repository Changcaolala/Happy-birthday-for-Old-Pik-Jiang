document.addEventListener('DOMContentLoaded', () => {

  // 音乐控制系统

  const music = new Audio('/Happy-birthday-for-Old-Pik-Jiang/res/audio/birthday.mp3');
  let isMuted = false;
  
  // 元素引用

  const elements = {
    timer: document.getElementById('timer'),
    slideshow: document.querySelector('.slideshow'),
    fab: document.querySelector('.fab'),
    volume: document.getElementById('volume')
  };
  
  // 初始化功能

  initMusicControls();
  initSlideshow();
  initTimer();

  // 音乐控制初始化

  function initMusicControls() {
    elements.fab.addEventListener('click', toggleMusic);
    elements.volume.addEventListener('input', updateVolume);
  }

  // 轮播初始化

  function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow img');
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 3000);
  }

  // 时间计算

  function initTimer() {
    fetch('/Happy-birthday-for-Old-Pik-Jiang/res/config.json')
      .then(res => res.json())
      .then(config => {
        setInterval(() => updateTimer(config.birthDate), 1000);
        updateTimer(config.birthDate); 
        // 立即初始化
      });
  }

  // 音乐切换

  function toggleMusic(e) {
    e.stopPropagation();
    isMuted = !isMuted;
    elements.fab.textContent = isMuted ? 'volume_off' : 'volume_up';
    isMuted ? music.pause() : music.play();
  }

  // 音量更新

  function updateVolume(e) {
    music.volume = e.target.value;
  }

  // 更新时间显示

  function updateTimer(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    const now = new Date();
    
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastDayOfPrevMonth.getDate();
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    elements.timer.innerHTML = `
        你已经在世上存在了：<br>
        ${years} 年 ${months} 月 ${days} 天
    `;
  }

  // 点击爱心效果

  document.addEventListener('click', (e) => {
    createHeart(e.clientX, e.clientY);
    if (!isMuted && music.paused) music.play();
  });

  function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${x - 12}px`;
    heart.style.top = `${y - 12}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
});