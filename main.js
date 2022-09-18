const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { SerialPort } = require('serialport');
const { electron } = require('electron');
const path  = require('path');
const url = require('url');
const cs = require('console-stamp')(console, '[HH:MM:ss]'); 
const iconPath = path.join(__dirname,'assets/img/phallus.ico');
// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// win config
let win;
let hasSetSPP = false;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        backgroundColor: "#ffffff",
        width: 960,
        height: 720,
        minWidth:960,
        minHeight:720,
        icon : iconPath,
        webPreferences: {
            sandbox: false,
            enableRemoteModule: true,
            nodeIntegration: false, // to allow require
            contextIsolation: true, // allow use with Electron 12+
            preload: path.join(__dirname, 'assets/js/win/preload.js')
        }
    });
    // and load the index.html of the app.
    win.loadURL(path.join(__dirname, 'build/index.html'));

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//renderer->main ipc
ipcMain.on("rtm", (event, arg) => {
  try{
    switch(arg){
      case "SPP": //Open Port Setting Window
      if(hasSetSPP==false){
        let PSW = new BrowserWindow({
          parent: win,
          model: true,
          backgroundColor: "#ffffff",
          width: 720,
          height: 560,
          minWidth:720,
          minHeight:560,
          icon : iconPath,
          webPreferences: {
              sandbox: false,
              enableRemoteModule: true,
              nodeIntegration: false, // to allow require
              contextIsolation: true, // allow use with Electron 12+
              preload: path.join(__dirname, 'assets/js/win/preload.js')
          }
        });
        PSW.loadURL(path.join(__dirname, 'html/SPP.html'));
        hasSetSPP = true;
        // Open the DevTools.
        // win.webContents.openDevTools()
    
        // Emitted when the window is closed.
        PSW.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            hasSetSPP = false;
            PSW = null;
        });
      }
      else{
        console.log("Only one portSetWin instance can open.");
      }
      break;
      default:
        break;
    }
    console.log("Received Args:"+arg);
  }
  catch(e){
    console.log("Data format error!");
    console.log(e);
  }
});

//setting data
async function listserialPorts() {
  await SerialPort.list().then((ports, err) => {
    if(err) {
      document.getElementById('error').textContent = err.message;
      return;
    } else {
      document.getElementById('error').textContent = '';
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered';
    }
  });
}

SerialPort.list().then((ports) => {
  console.log(ports[0]); // 打印串口列表
}).catch((err) => {
  console.log(err);
});
//     sampleOnStatus: false,
//     autoscrollStatus: false
// }
//ipcMain communication
// ipcMain.on('msg1', (ev, data) => {
//     console.log(data);
//     // 发送消息给渲染进程
//     ev.sender.send('msg1Re', '这是一条来自主进程的反馈消息');
//     console.log("send finished.");
// });

//main process signal