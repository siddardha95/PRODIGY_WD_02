(() => {
  let startTime = 0,
      elapsed = 0,
      timerId = null,
      lapCount = 0;

  const $time = document.getElementById('time'),
        $start = document.getElementById('startBtn'),
        $lap = document.getElementById('lapBtn'),
        $reset = document.getElementById('resetBtn'),
        $laps = document.getElementById('laps');

  const fmt = ms => {
    const cs = Math.floor((ms % 1000) / 10);
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor(ms / 60000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const tick = () => {
    elapsed = Date.now() - startTime;
    $time.textContent = fmt(elapsed);
    const deg = (elapsed % 60000) / 60000 * 360;
    document.documentElement.style.setProperty('--deg', deg + 'deg');
  };

  $start.onclick = () => {
    if (!timerId) {
      startTime = Date.now() - elapsed;
      timerId = setInterval(tick, 31);
      $start.textContent = 'Pause';
      $lap.disabled = $reset.disabled = false;
    } else {
      clearInterval(timerId);
      timerId = null;
      tick();
      $start.textContent = 'Resume';
    }
  };

  $lap.onclick = () => {
    if (!timerId) return;
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${++lapCount}</span><span>${fmt(elapsed)}</span>`;
    $laps.prepend(li);
  };

  $reset.onclick = () => {
    clearInterval(timerId);
    timerId = null;
    elapsed = 0;
    lapCount = 0;
    $time.textContent = '00:00.00';
    document.documentElement.style.setProperty('--deg', '0deg');
    $laps.innerHTML = '';
    $start.textContent = 'Start';
    $lap.disabled = $reset.disabled = true;
  };
})();
