import * as utils from "./utils.js"
import * as versions from "./versions.js"

export class MinecraftRunner {

    private version: versions.Version

    constructor(version: versions.Version) {
        this.version = version
    }

    unpackNatives(nativesDir: string) {
        // TODO: important
    }

    createClasspath() {
        var cp: string = ''
        for (var lib in this.version.libraries) {
            cp = cp + '\"' + versions.Library.getLibraryJarFromName(this.version.libraries[lib].name) + '\";'
        }
        cp = cp + '\"' + versions.Version.getVersionJar(this.version.id) + '\", net.minecraft.launchwrapper.Launch'
        return cp
    }

    start() {
        console.log(`Launching Minecraft ${this.version.id}`)

        var gameDirectory = utils.OperatingSystem.getMinecraftDataDirectory()
        var nativesDirectory = `${gameDirectory}/versions/${this.version.id}/${this.version.id}-natives-temp`
        var serverResourcePacksDirectory = `${gameDirectory}/server-resource-packs`

        utils.FileUtils.createDirectoryIfNotExists(nativesDirectory)
        utils.FileUtils.createDirectoryIfNotExists(serverResourcePacksDirectory)

        console.log(`Unpacking natives to ${nativesDirectory}`)
        this.unpackNatives(nativesDirectory)

        var args: Array<string> = []

        if (utils.OperatingSystem.getOS() === utils.OperatingSystem.MACOS) {
            // TODO: Xdock:icon
            args.concat('-Xdock:name=Minecraft')
        } else if (utils.OperatingSystem.getOS() === utils.OperatingSystem.WINDOWS) {
            args.concat('-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump')
        }

        args.concat(`-Djava.library.path=${nativesDirectory}`)
        args.concat('-cp')
        args.concat(this.createClasspath())
    }

}
