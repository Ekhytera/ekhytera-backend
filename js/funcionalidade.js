import { games } from './allGames.js';

const fortnite = games.find(game => game.name === 'fortnite');
const valorant = games.find(game => game.name === 'valorant');
const cs2 = games.find(game => game.name === 'cs2');
const lol = games.find(game => game.name === 'lol');
const gtaV = games.find(game => game.name === 'gtaV');
const hknight = games.find(game => game.name === 'hollowknight');
const minecraft = games.find(game => game.name === 'minecraft');
const nfs = games.find(game => game.name === 'nfs');
const rdr2 = games.find(game => game.name === 'rdr2');
const roblox = games.find(game => game.name === 'roblox');
const rleague = games.find(game => game.name === 'rleague');
const thesims4 = games.find(game => game.name === 'thesims4');

let fortniteButton = document.getElementById('fort');
let valorantButton = document.getElementById('val');
let cs2Button = document.getElementById('cs');
let lolButton = document.getElementById('league');
let gtaButton = document.getElementById('gta');
let hkButton = document.getElementById('hknight');
let mineButton = document.getElementById('minecraft');
let nfsButton = document.getElementById('nfs');
let rdr2Button = document.getElementById('rdr2');
let robloxButton = document.getElementById('roblox');
let rleagueButton = document.getElementById('rleague');
let theSims4Button = document.getElementById('thesims4');

const minGpu = document.getElementById('minGpu');
const minCpu = document.getElementById('minCpu');
const minRam = document.getElementById('minRam');

const recGpu = document.getElementById('recGpu');
const recCpu = document.getElementById('recCpu');
const recRam = document.getElementById('recRam');

let selectedGames = [];

/*
function selectionToggler(button, game) {
    if (button.style.textDecoration === '') {
        button.style.textDecoration = 'line-through';
        button.style.opacity = 0.5;
        selectedGames.push(game);
    }
    else {
        button.style.textDecoration = '';
        button.style.opacity = 1;
        const index = selectedGames.indexOf(game);
        if (index > -1) {
            selectedGames.splice(index, 1);
        }
    }
}
*/

function selectionToggler(button, game) {
    let checkmark = button.querySelector('.checkmark');
    const img = button.querySelector('img');

    if (!checkmark) {
        checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');
        checkmark.innerHTML = '✔';
        button.appendChild(checkmark);
    }

    if (checkmark.style.display === 'none' || checkmark.style.display === '') {
        checkmark.style.display = 'flex';
        img.style.opacity = 0.5;
        selectedGames.push(game);
        calculateMinSpecsPC();
        calculateRecSpecsPC();
    } else {
        checkmark.style.display = 'none';
        img.style.opacity = 1;
        const index = selectedGames.indexOf(game);
        if (index > -1) {
            selectedGames.splice(index, 1);
        }
        calculateMinSpecsPC();
        calculateRecSpecsPC();
    }
}

fortniteButton.addEventListener('click', function () {
    selectionToggler(fortniteButton, fortnite);
});

valorantButton.addEventListener('click', function () {
    selectionToggler(valorantButton, valorant);
});

cs2Button.addEventListener('click', function () {
    selectionToggler(cs2Button, cs2);
});

lolButton.addEventListener('click', function () {
    selectionToggler(lolButton, lol);
});

gtaButton.addEventListener('click', function () {
    selectionToggler(gtaButton, gtaV);
});

hkButton.addEventListener('click', function () {
    selectionToggler(hkButton, hknight);
});

mineButton.addEventListener('click', function () {
    selectionToggler(mineButton, minecraft);
});

nfsButton.addEventListener('click', function () {
    selectionToggler(nfsButton, nfs);
});

rdr2Button.addEventListener('click', function () {
    selectionToggler(rdr2Button, rdr2);
});

robloxButton.addEventListener('click', function () {
    selectionToggler(robloxButton, roblox);
});

rleagueButton.addEventListener('click', function () {
    selectionToggler(rleagueButton, rleague);
});

theSims4Button.addEventListener('click', function () {
    selectionToggler(theSims4Button, thesims4);
});

function calculateRecSpecsPC() {
    if (selectedGames.length === 0) {
        recGpu.textContent = '';
        recCpu.textContent = '';
        recRam.textContent = '';
    }
    else {
        let maxGPU = selectedGames[0].recHardware.GPU;
        let maxCPU = selectedGames[0].recHardware.CPU;
        let maxRAM = selectedGames[0].recHardware.RAM;

        selectedGames.forEach(game => {
            if (game.recHardware.GPU.rating > maxGPU.rating) {
                maxGPU = game.recHardware.GPU;
            }
            if (game.recHardware.CPU.rating > maxCPU.rating) {
                maxCPU = game.recHardware.CPU;
            }
            if (game.recHardware.RAM > maxRAM) {
                maxRAM = game.recHardware.RAM;
            }
        });

        let pcBuild = {
            GPU: maxGPU.model,
            CPU: maxCPU.model,
            RAM: maxRAM,
        };

        recGpu.textContent = pcBuild.GPU;
        recCpu.textContent = pcBuild.CPU;
        recRam.textContent = pcBuild.RAM + 'GB';
    }
}

function calculateMinSpecsPC() {
    if (selectedGames.length === 0) {
        minGpu.textContent = '';
        minCpu.textContent = '';
        minRam.textContent = '';
    }
    else {
        let maxGPU = selectedGames[0].minHardware.GPU;
        let maxCPU = selectedGames[0].minHardware.CPU;
        let maxRAM = selectedGames[0].minHardware.RAM;

        selectedGames.forEach(game => {
            if (game.minHardware.GPU.rating > maxGPU.rating) {
                maxGPU = game.minHardware.GPU;
            }
            if (game.minHardware.CPU.rating > maxCPU.rating) {
                maxCPU = game.minHardware.CPU;
            }
            if (game.minHardware.RAM > maxRAM) {
                maxRAM = game.minHardware.RAM;
            }
        });

        let pcBuild = {
            GPU: maxGPU.model,
            CPU: maxCPU.model,
            RAM: maxRAM,
        };

        minGpu.textContent = pcBuild.GPU;
        minCpu.textContent = pcBuild.CPU;
        minRam.textContent = pcBuild.RAM + 'GB';
    }
};