var ipcRenderer = require('electron').ipcRenderer

ipcRenderer.send('listDir', '/')

ipcRenderer.on('listDirSuccess', function(event, arg) {
    // Log the list of files/directories to the console
    console.log(arg)
})
