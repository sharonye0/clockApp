const html = document.querySelector("html");
const darkModeBtn = document.querySelector(".toggle");
const seconds = document.querySelector(".second");
const minutes = document.querySelector(".minute");
const hours = document.querySelector(".hour");
const digitalTime = document.querySelector(".time");
const date = document.querySelector(".date");
const dayhtml = document.querySelector(".date span");

darkModeBtn.addEventListener("click", () => html.classList.toggle("dark"));

let curDate = new Date();
// prettier-ignore
const months = [
   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];
const day = curDate.getDate();
const month = curDate.getMonth();
const weekday = curDate.toLocaleDateString("en-US", { weekday: "long" });

function getTime() {
   curDate = new Date();
   const hours = curDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
   });
   return `${hours}`;
}

function scale(number, inMin, inMax, outMin, outMax) {
   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

(() => {
   digitalTime.textContent = getTime();
   date.insertAdjacentHTML(
      "afterbegin",
      `
    ${weekday}, ${months[month].slice(0, 3)} <span class="circle">${day}</span>
    `
   );
})();

setInterval(() => {
   let test = new Date();
   digitalTime.textContent = getTime();
   // (FIX) {After 1 minutes the seconds needle will rotate in a full circle}
   // prettier-ignore
   seconds.style.transform = `rotate(${scale(test.getSeconds(), 0, 59, 0, 360)}deg) translateY(-60px)`;
   // prettier-ignore
   minutes.style.transform = `rotate(${scale(test.getMinutes(), 0, 59, 0, 360)}deg) translateY(-60px)`;
   // prettier-ignore
   hours.style.transform = `rotate(${scale(test.getHours() % 12, 0, 11, 0, 360)}deg) translateY(-45px)`;
}, 1000);
