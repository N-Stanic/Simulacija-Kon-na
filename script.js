/*JS*/
import { materials } from './materials.js';
const app = document.querySelector('#app');
const sidebar = document.querySelector('#sidebar');
let timer = 10;

/* Drag and drop functionality via DOM */
//Add event listeners to draggable elements
app.addEventListener('dragstart', (event) => {
  if (!event.target.classList.contains('draggable')) return;
  event.target.classList.add('dragging');
});

//Add an event listener for when the drag ends
app.addEventListener('dragend', (event) => {
  if (!event.target.classList.contains('draggable')) return;
  event.target.classList.remove('dragging');
});

//Adds an event listener for when the dragged element is over a container
app.addEventListener('dragover', (event) => {
  if (!event.target.classList.contains('container')) return;
  event.preventDefault();
  const draggable = document.querySelector('.dragging');
  if (event.target.contains(draggable)) return;
  event.target.appendChild(draggable);
  event.target.classList.remove('selected');
});

/** Add energy values */
//We define start, hot and cold so we can use them easier
const hot = document.querySelector('#hot');
const cold = document.querySelector('#cold');
const start = document.querySelector('#start');
//set appropriate energy
for (let child of start.querySelectorAll('.draggable')) {
  materials[child.id].energy =
    (materials[child.id].temperature + 273) * materials[child.id].capacity;
}

/**Sinhronizacija napisane vrednosti in slajderjev */

let heatingw = 500;
let coolingw = 500;

document.querySelector('.sliderh').addEventListener('input', updateValueHot);
document
  .getElementById('heatinginput')
  .addEventListener('input', updateValueHot);

function updateValueHot(e) {
  let sibling = e.target.previousElementSibling || e.target.nextElementSibling;
  sibling.value = e.target.value;
  heatingw = e.target.value;
  //console.log(heatingw); //Obsolete check
}
document.querySelector('.sliderc').addEventListener('input', updateValueCold);
document
  .getElementById('coolinginput')
  .addEventListener('input', updateValueCold);
function updateValueCold(e) {
  let sibling = e.target.previousElementSibling || e.target.nextElementSibling;
  sibling.value = e.target.value;
  coolingw = e.target.value;
}

let hoton = false;
let coldon = false;

document.querySelector('#HotOn').addEventListener('click', TurnOnHot);
document.querySelector('#HotOff').addEventListener('click', TurnOffHot);
document.querySelector('#ColdOn').addEventListener('click', TurnOnCold);
document.querySelector('#ColdOff').addEventListener('click', TurnOffCold);

function TurnOnHot() {
  //console.log('Hot was turned on');
  hoton = true;
  document.querySelector('#vklopgrelec').innerHTML = '<b>Grelec vklopljen</b>';
  document.querySelector('#vklopgrelec').style = 'color:#6f9c3d';
}
function TurnOffHot() {
  //console.log('Hot was turned off');
  hoton = false;
  document.querySelector('#vklopgrelec').innerHTML = 'Grelec izklopljen';
  document.querySelector('#vklopgrelec').style = 'color:red';
}

function TurnOnCold() {
  //console.log('Cold was turned on');
  coldon = true;
  document.querySelector('#vklophladilec').innerHTML =
    '<b>Hladilec vklopljen</b>';
  document.querySelector('#vklophladilec').style = 'color:#6f9c3d';
}
function TurnOffCold() {
  console.log('Cold was turned off');
  coldon = false;
  document.querySelector('#vklophladilec').innerHTML = 'Hladilec izklopljen';
  document.querySelector('#vklophladilec').style = 'color:red';
}

let isolation = false;

/**function Isolate() {
  console.log('Isolation was turned on');
  for (let container of app.querySelectorAll('.container')) {
    container.style.border = '10px solid grey';
  }
  isolation = true;
}
function IsolateOff() {
  console.log('Isolation was turned off');
  for (let container of app.querySelectorAll('.container')) {
    container.style.border = '1px solid black';
  }
  isolation = false;
} */

function energyup() {
  //We must go through all of hot's child nodes
  if (hoton == false) {
    //console.log('Hot is turned off'); //Obsolete check
    return;
  } else {
    for (let child of hot.querySelectorAll('.draggable')) {
      //console.log("Hot contains " + child.id); //Obsolete check
      //We increase the energy of the appropriate material
      materials[child.id].energy += Number(heatingw);

      /*console.log(
      materials[child.id].name +
        ' has ' +
        materials[child.id].energy +
        ' joules of internal energy'); */ //Obsolete check

      materials[child.id].temperature =
        materials[child.id].energy / materials[child.id].capacity - 273;
      //console.log("Hot contains " + child.id + " with a temperature of " + materials[child.id].temperature); //Obsolete check
    }
    listing();
  }
}
function energydown() {
  if (coldon == false) {
    console.log('Cold is turned off'); //Obsolete check
    return;
  } else {
    for (let child of cold.querySelectorAll('.draggable')) {
      //We decrease the energy of the appropriate material
      //console.log('Cold contains ' + child.id); //Obsolete check
      materials[child.id].energy -= Number(coolingw);
      /*console.log(
        materials[child.id].name +
          ' has ' +
          materials[child.id].energy +
          ' joules of internal energy'
      );*/ //Obsolete check

      materials[child.id].temperature =
        materials[child.id].energy / materials[child.id].capacity - 273;

      if (Math.round(materials[child.id].temperature) <= Math.round(-273)) {
        materials[child.id].temperature = 0;
        materials[child.id].energy = 0;
      }

      //console.log("Cold contains " + child.id + " with a temperature of " + materials[child.id].temperature); //Obsolete check
    }
  }
  listing();
}

/**Funkcijo energy zaženemo vsakih 10 ms */
//setInterval(energyup, timer);
//setInterval(energydown, timer);

/**Lists the material properties in the sidebar */
function listing() {
  let listed = app.querySelector('.listed');
  if (listed == null) return;
  /**Defining shortcuts */
  const name = sidebar.querySelector('#ListName');
  const temp = sidebar.querySelector('#ListTemp');
  const tempK = sidebar.querySelector('#ListTempK');
  const E = sidebar.querySelector('#ListE');
  const C = sidebar.querySelector('#ListC');
  const sta = sidebar.querySelector('#Stanje');
  const V = sidebar.querySelector('#ListVrelisce');
  const T = sidebar.querySelector('#ListTalisce');

  /**S to kodo vnesemo lastnosti materiala v sidebar */
  name.innerHTML = materials[listed.id].name;
  temp.innerHTML = Math.round(materials[listed.id].temperature);
  tempK.innerHTML = Math.round(materials[listed.id].temperature + 273);
  E.innerHTML = Math.round(materials[listed.id].energy);
  C.innerHTML = Math.round(materials[listed.id].capacity);
  E.innerHTML = Math.round(materials[listed.id].energy);
  V.innerHTML = Math.round(materials[listed.id].vrelisce);
  T.innerHTML = Math.round(materials[listed.id].talisce);

  const meltingpoint = Math.round(materials[listed.id].talisce);
  const boilingpoint = Math.round(materials[listed.id].vrelisce);

  if (
    Math.round(materials[listed.id].temperature) >= Math.round(boilingpoint) &&
    Math.round(materials[listed.id].temperature) > Math.round(meltingpoint)
  ) {
    //sta.innerHTML = '<b>Material vre!</b>';
    //sta.style = 'color:red';
    document.querySelector('#stanjevrelo').style.visibility = 'visible';
    document.querySelector('#absolutnanicla').style.visibility = 'hidden';
    document.querySelector('#stanjetrdno').style.visibility = 'hidden';
    document.querySelector('#stanjetekoce').style.visibility = 'hidden';
  }

  if (
    Math.round(materials[listed.id].temperature) <= Math.round(boilingpoint) &&
    Math.round(materials[listed.id].temperature) > Math.round(meltingpoint)
  ) {
    //sta.innerHTML = '<b>Material je tekoči.</b>';
    //sta.style = 'color:#800080';
    document.querySelector('#stanjetekoce').style.visibility = 'visible';
    document.querySelector('#absolutnanicla').style.visibility = 'hidden';
    document.querySelector('#stanjetrdno').style.visibility = 'hidden';
    document.querySelector('#stanjevrelo').style.visibility = 'hidden';
  }

  if (
    Math.round(materials[listed.id].temperature) <= Math.round(boilingpoint) &&
    Math.round(materials[listed.id].temperature) < Math.round(meltingpoint)
  ) {
    //sta.innerHTML = '<b>Material je trden.</b>';
    //sta.style = 'color:blue';
    document.querySelector('#stanjetrdno').style.visibility = 'visible';
    document.querySelector('#absolutnanicla').style.visibility = 'hidden';
    document.querySelector('#stanjetekoce').style.visibility = 'hidden';
    document.querySelector('#stanjevrelo').style.visibility = 'hidden';
  }
  if (Math.round(materials[listed.id].temperature) == Math.round(0)) {
    //sta.innerHTML = 'Material je dosegel absolutno ničlo!';
    //
    sta.style = 'color:black';
    document.querySelector('#absolutnanicla').style.visibility = 'visible';
    document.querySelector('#stanjetrdno').style.visibility = 'hidden';
    document.querySelector('#stanjetekoce').style.visibility = 'hidden';
    document.querySelector('#stanjevrelo').style.visibility = 'hidden';
  }
}

/*export function deselection() {
  const sidenav = document.querySelector('#sidebar');
  const name = sidebar.querySelector('#ListName');
  const temp = sidebar.querySelector('#ListTemp');
  const tempK = sidebar.querySelector('#ListTempK');
  const E = sidebar.querySelector('#ListE');
  const C = sidebar.querySelector('#ListC');
}*/ //Obsolete

app.addEventListener('mouseover', (event) => {
  if (!event.target.classList.contains('draggable')) return;
  for (let child of app.querySelectorAll('.listed')) {
    //console.log(child.id);
    if (!child.querySelector('last')) {
      //console.log('Removed listed from ' + child.id); //Obsoletee check
      child.classList.remove('listed');
    }
  }
  event.target.classList.add('listed');
  event.target.classList.add('last');
  listing();
});

/*app.addEventListener('mouseout', (event) => {
  if (!event.target.classList.contains('draggable')) return;
  if (event.target.classList.contains('last')) {
    event.target.classList.remove('last');
    console.log('Removed last from ' + event.target.id);
    return;
  }
  event.target.classList.remove('listed');
});*/ //Obsolete

document.querySelector('#Korak').addEventListener('click', () => {
  energyup();
  energydown();
  listing();
});

let i;

document.querySelector('#Zacni').addEventListener('click', () => {
  i = setInterval(function () {
    energyup();
    energydown();
    listing();
    //console.log('interval teče');
  }, 1000);
  document.querySelector('#casvklop').innerHTML = '<b>Čas teče</b>';
  document.querySelector('#casvklop').style = 'color:#6f9c3d';
});

document.querySelector('#Ustavi').addEventListener('click', () => {
  clearInterval(i);
  //console.log('Interval ustavljen');
  document.querySelector('#casvklop').innerHTML = 'Čas ne teče';
  document.querySelector('#casvklop').style = 'color:red';
});

/*Alert za navodila ko je kliknjen gumb "navodila"*/
document.querySelector('#navodila').addEventListener('click', () => {
  alert(
    'Pozdravljeni v simulaciji na temo toplota in energija. Za začetek nastavite moč grelca ter moč hladilca, ter vklopite.\nNa desni imate različne plošče - startna plošča, rdeča grelna plošča, ter modra hladilna plošča.\nNa startni plošči se nahajajo različni materiali. Ko podržiš kurzor nad material se izpišejo razni podatki materiala.\nVsi materiali so kocke z maso 1 kg, ter različnih velikosti odvisno od gostote.\nZ klikom na gumb "časovni korak" lahko čas napreduje za 1 sekundo, če pa teče, pa vsaka kocka na grelni/hladilni plošči dobi/izgubi toliko energije, kot je nastavljeno za ploščo.\nZ klikom na gumb "spremeni grafiko" lahko preklopite med enostavno grafiko kvadratkov, ter grafiko s sličicami.\n\nSimulacija je namenjena osnovni šoli in zato zanemari izgubo toplote v okolico!\n\nKontakt: nino.stanic.1999@gmail.com'
  );
});

/*Alert za primere različnih moči*/
document.querySelector('#primeri').addEventListener('click', () => {
  alert(
    "Primeri raznih moči naprav\n\n1 W - Naprava (npr. televizija) v stanju pripravljenosti\n5 W - Vklopljen LED trak\n5 do 10 W - polnilci telefonov\n20 do 100W - Različni tipi žarnic\n50 do 100 W - Polnilci prenosnih računalnikov\n100 do 600 W - Stacionarni in 'gaming' računalniki\n100 do 400 W - Hladilnik in zmrzovalnik\n250 do 400 W - Sončni paneli\n1000 do 2000 W - Električni štedilniki\n1000 do 4000 W - Sušilec za oblačila\n4000 do 12000 W - Bojler za vodo\n"
  );
});

let visibility = true;

document.querySelector('#grafikaspremeni').addEventListener('click', () => {
  //console.log('Spreminjam grafiko'); //obsolete check

  if (visibility == true) {
    for (let img of document.querySelectorAll('.graphic')) {
      //console.log('Spreminjam grafiko ' + img); //obsolete check
      img.style.visibility = 'hidden';
    }
    visibility = false;
  } else {
    for (let img of document.querySelectorAll('.graphic')) {
      //console.log('Spreminjam grafiko ' + img); //obsolete check
      img.style.visibility = 'visible';
    }
    visibility = true;
  }
});
