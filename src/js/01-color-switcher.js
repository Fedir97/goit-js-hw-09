const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector("body")
let colorswitcher; 
btnStart.addEventListener("click", () => {
    colorswitcher = setInterval(() => {
      body.style.backgroundColor= `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      btnStart.disabled = true;
    }, 1000);
  });

  btnStop.addEventListener("click", ()=>{
    clearInterval(colorswitcher)
    btnStart.disabled = false;
  })
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

