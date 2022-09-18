// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const { Path } = require('path');
// const { app, ipcRenderer } = require('electron');
// if (typeof module === 'object')
// {
//     window.module = module; 
//     module = undefined;
// }

// // import javascript file
// var jqueryFile = document.createElement('script');
// var colResizableFile = document.createElement('script');

// jqueryFile.src = Path.join(__dirname, '/src/js/jquery-3.6.0.js');
// colResizableFile.src = Path.join(__dirname,'/src/js/colResizable-1.6.js');

// document.getElementsByTagName('head')[0].appendChild(jqueryFile);
// document.getElementsByTagName('head')[0].appendChild(colResizableFile);

// if (window.module)
// module = window.module;

// set attr of elem
// const globalWidth = window.innerWidth;
// const divHeight = window.innerHeight/6;

// oscilloscope panel elem
const wf = document.getElementById('wf'); //waveform
const samplingBtn = document.getElementById("samplingBtn");
const autoscrollBtn = document.getElementById("autoscrollBtn");
const saveBtn = document.getElementById("saveBtn");
const portBtn = document.getElementById("portBtn");

//serial port


//waveform draw
const wfc = wf.getContext('2d'); 
wfc.fillStyle ='black';
const centerX = wf.offsetLeft + wf.offsetWidth / 2;
const centerY = wf.offsetTop + wf.offsetHeight / 2;

//panel status
var sampleOnStatus = false; // 0 close 1 open
var autoscrollStatus = false;


samplingBtn.addEventListener('click',function(event){
  sampleOnStatus=!sampleOnStatus;
  if(sampleOnStatus==true)
  {
    samplingBtn.style.color="white";
    samplingBtn.style.backgroundColor="black";
    samplingBtn.textContent="Sampling On ";
  }
  else
  {
    samplingBtn.style.color="black";
    samplingBtn.style.backgroundColor="transparent";
    samplingBtn.textContent="Sampling Off";
  }
});

autoscrollBtn.addEventListener('click',function(event){
  autoscrollStatus=!autoscrollStatus;
  if(autoscrollStatus==true)
  {
    autoscrollBtn.style.color="white";
    autoscrollBtn.style.backgroundColor="black"; 
  }
  else
  {
    autoscrollBtn.style.color="black";
    autoscrollBtn.style.backgroundColor="transparent";
  }
});

saveBtn.addEventListener('click',function(event){
  saveBtn.style.color="white";
  saveBtn.style.backgroundColor="black";
  setTimeout(()=>{
    saveBtn.style.color="black";
    saveBtn.style.backgroundColor="transparent";
  },100);
});

portBtn.addEventListener('click',function(event){
  window.api.send("rtm","SPP");
});

// const tInterval = ;
// const vInterval = ;
function drawBackground(){
  wfc.fillRect(0,0,wf.offsetWidth,wf.offsetHeight);
  var curWidth=wf.offsetWidth;
  var curHeight=wf.offsetHeight;
  //vertical left
  // for (var interval = ){

  // } 
  // for (){

  // }
}

function addPort(){
}

// setInterval(() => {
//   window.api.send("toMain","hello,main\n");
// },1000);

// setInterval(() => {
//   window.api.receive("fromMain",console.log("copy that"));
// },1000);


//ipcRenderer communication
// setInterval(() => {
//     ipcRenderer.send('msg1', 'wjc is here');
// },1000);
// // 监听消息
// ipcRenderer.on('msg1Re', (ev, data) => {
// });

// async function listSerialPorts() {
//   await SerialPort.list().then((ports, err) => {
//     if(err) {
//       document.getElementById('error').textContent = err.message;
//       return;
//     } else {
//       document.getElementById('error').textContent = '';
//     }
//     console.log('ports', ports);

//     if (ports.length === 0) {
//       document.getElementById('error').textContent = 'No ports discovered';
//     }

//     tableHTML = tableify(ports);
//     document.getElementById('ports').innerHTML = tableHTML;
//   });
// }

// function listPorts() {
//   listSerialPorts();
//   setTimeout(listPorts, 2000);
// }

// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
// setTimeout(listPorts, 2000);

// listSerialPorts();

drawBackground();
