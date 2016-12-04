const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const url = require('url')
const mysql = require('mysql');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const fs = require('fs') // To read the directory listing

ipcMain.on('listDir', function(event, arg) {
  fs.readdir(arg, function(err, files) {
    event.sender.send('listDirSuccess', files)
  })
})

function createWindow() {

  //https://github.com/mysqljs/mysql
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'bob',
    password: 'secret',
    database: 'my_db'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
      console.log(results);
    });
    console.log('connected as id ' + connection.threadId);
  });

  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'html/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

// This method will be called when Electron has finished
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
