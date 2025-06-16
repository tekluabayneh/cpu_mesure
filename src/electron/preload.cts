
const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {

        electron.ipcRenderer.on("statstics", (_, stats) => {
            callback({ stats })
        }

    },
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData")

} satisfies window["electron"])

