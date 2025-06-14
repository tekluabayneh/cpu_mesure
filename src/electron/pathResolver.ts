import path from "path"
import { isDev } from "./util.js"
import { app } from "electron"
export const getPreloadPath = () => {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        '/dist-electron/preload.cjs'
    )
}
