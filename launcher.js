var electron = require('electron')

const app           = electron.app,
      ipc           = electron.ipcMain,
      BrowserWindow = electron.BrowserWindow

let mainWindow

app.on('ready', function () {
    // Create main window
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720
    })
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
})

app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
