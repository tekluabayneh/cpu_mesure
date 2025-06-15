type Statstics = {
    cpuUsage: number;
    ramUsage: number;
    getStorage: number;

}

type StaticsData = {
    totalStorage: number;
    cpuModel: number;
    totalMemoryGB: number;
}



interface window {
    electron: {
        subscribeStatistics: (callback: (statstics: Statstics) => void) => void
        getStaticData: () => Promise<StaticsData>
    }

}
