// window.addEventListener("scroll", preventMotion, false);
// window.addEventListener("touchmove", preventMotion, false);

// function preventMotion(event)
// {
//     window.scrollTo(0, 0);
//     event.preventDefault();
//     event.stopPropagation();
// }

let score = 0;
let timer = 29;
let round = 1;
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");

let mole1 = document.querySelectorAll(".mole1");
let mole2 = document.querySelectorAll(".mole2");
let mole3 = document.querySelectorAll(".mole3");
let mole4 = document.querySelectorAll(".mole4");

let cash1 = document.querySelectorAll(".cash1");
let cash2 = document.querySelectorAll(".cash2");
let cash3 = document.querySelectorAll(".cash3");
let cash4 = document.querySelectorAll(".cash4");

const darkmole = [mole1, mole2, mole3, mole4];
const darkcash = [cash1, cash2, cash3, cash4];

let mole = darkmole[round];
let cash = darkcash[round];
let result = 0;

let min = round;
let max = round + 1;

start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(() => {
        result = choice(min, max);
        console.log(result);
        if (result % 2 == 0) {
            popUpsPlus()
        }
        else {
            popUpsMinus()
        };
    }, 2000);
    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementById('start').style.visibility = "visible";
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
    }, 30900);
});

function choice(min, max) {
    let result = (Math.floor(Math.random() * (max - min + 1)) + 2);
    return result;
};

const popUpsMinus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`mole${round}`);
    console.log("pop-");
    {
        window.setInterval(() => {
            console.log("clearHole");
            let clearHole = document.querySelectorAll(`.mole${round}`);
            clearHole.forEach((val) => {
                val.classList.replace(`mole${round}`, "darkhole");
            })
        }, 3000)

        holes.forEach((val) => {
            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains(`mole${round}`)) {
                    e.target.classList.replace(`mole${round}`, "splat")
                    score = score - 15;
                }
            })
        })
    }
};


const popUpsPlus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`cash${round}`);
    console.log("pop+");
    {
        window.setInterval(() => {
            console.log("clear");
            let clearHole = document.querySelectorAll(`.cash${round}`);
            clearHole.forEach((val) => {
                val.classList.replace(`cash${round}`, "darkhole");
            })
        }, 3000)
        holes.forEach((val) => {
            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains(`cash${round}`)) {
                    e.target.classList.replace(`cash${round}`, "smash")
                    score = score + 50;
                }
            })
        })
    }
};

let resetHoles = window.setInterval(() => {
    let smash = document.querySelectorAll(".smash");
    smash.forEach((val) => {
        val.classList.replace("smash", `cash${round}`);

    })
    let splat = document.querySelectorAll(".splat");
    splat.forEach((val) => {
        val.classList.replace("splat", `mole${round}`);
    })
}, 1500);

let tl = gsap.timeline();

tl.set(".roundModal",{transformOrigin: "50%, 50%"});
tl.to(".roundModal",{duration:4, y:500, ease:"bounce", backgroundColor: "#000000bf", border:"5px ridge white", borderRadius: "20%", });
