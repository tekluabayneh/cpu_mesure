import os from "os"
import OsUtils from "os-utils"
import fs from "fs"
import { BrowserWindow } from "electron"
const POLLING_INTERVAl = 500

export const pollResources = (mainwindow: BrowserWindow) => {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const ramUsage = getRamUsage()
        const getStorage = getStorageData().useage
        mainwindow.webContents.send("statstics", { cpuUsage, ramUsage, getStorage })
    }, POLLING_INTERVAl)

}

const getCpuUsage = () => {
    return new Promise((res) => {
        OsUtils.cpuUsage(res)
    })
}


const getRamUsage = () => {
    return 1 - OsUtils.freememPercentage()
}


export const getStaticData = () => {
    const totalStorage = getStorageData().total
    const cpuModel = os.cpus()[0].model
    const totalMemoryGB = Math.floor(OsUtils.totalmem() / 1024)

    return {


        totalStorage,
        cpuModel,
        totalMemoryGB
    }

}

const getStorageData = () => {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/")
    const total = stats.bsize * stats.blocks
    const free = stats.bfree * stats.bfree

    return {
        total: Math.floor(total / 1_000_000_000),
        useage: 1 - free / total
    }
}
