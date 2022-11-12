const {
    app,
    BrowserWindow,
    desktopCapturer
} = require('electron');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600
    });

    mainWindow.loadURL('http://localhost:3000/');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.setPosition(0, 0);

        desktopCapturer.getSources({
            types: ['window', 'screen']
        }).then(sources => {
            for (const source of sources) {
                if (source.name === 'Screen 1') {
                    mainWindow.webContents.send('SET_SOURCE_ID', source.id);
                    return;
                }
            }
        });
    });
}

app.on('ready', () => {
    createWindow();
})