const speedSlider = document.getElementById("speed");
const [binary, octal, decimal, hexadecimal] = document.querySelectorAll(".binary, .octal, .decimal, .hexadecimal");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const systems = [];

[binary, octal, decimal, hexadecimal].forEach((element, index) => {
  element.innerHTML = element.classList[0].slice(0, 3) + "-";
  for (let i = 0; i < 16; i++) element.innerHTML += "<span>0</span>";
  const base = [2, 8, 10, 16][index];
  const spans = Array.from(element.querySelectorAll("span"));
  systems.push({ base, spans });
});

let counter = 0,
lastTime = performance.now(),
accumulator = 0;

function getStepDelay() {
  return Math.max(1, -Number(speedSlider.value) * 199 / 13 + 200);
}

function renderAll() {
  systems.forEach(sys => {
    let str = counter.toString(sys.base);
    str = str.padStart(sys.spans.length, "0");
    for (let i = 0; i < sys.spans.length; i++) sys.spans[i].textContent = str[i];
  });
}

function animate(now) {
  const dt = now - lastTime;
  lastTime = now;
  const stepDelay = getStepDelay();
  accumulator += dt;

  while (accumulator >= stepDelay) {
    accumulator -= stepDelay;
    counter = (counter + 1) % 2 ** 16;
    renderAll();
  }

  requestAnimationFrame(animate);
}

renderAll();
requestAnimationFrame(animate);