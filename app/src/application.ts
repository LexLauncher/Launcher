import * as utils from "./utils.js"
import * as versions from "./versions.js"
import child_process = require('child_process')

import Promise = require('bluebird');

const spawn = child_process.spawn
var minecraftProcess: child_process.ChildProcess = null

// Lets ensure that the relevant directories exist.
utils.FileUtils.createDirectoryIfNotExists(utils.OperatingSystem.getMinecraftDataDirectory())
utils.FileUtils.createDirectoryIfNotExists(utils.OperatingSystem.getLexLauncherDataDirectory())

// Let's wait for the page to load.
$(document).ready(function () {
    // The play button was clicked
    $('#playButton').on('click', function() {
        // Let's test launching Minecraft 
        //if (minecraftProcess === null) {

            var mcVersion = versions.Version.getVersion('1.10.2')
            var mcJar = versions.Version.getVersionJar('1.10.2')

            minecraftProcess = child_process.spawn('javaw', 
                ['-cp -Djava.library.path=natives/', getClasspath(mcVersion, mcJar), mcVersion.minecraftArguments])

            minecraftProcess.stderr.on('log_error', function(d) {
                console.log(d)
            }) 

            minecraftProcess.stdout.on('log_data', function(d) {
                console.log(d)
            })
     
            console.log(`java -cp ${getClasspath(mcVersion, mcJar)} ${mcVersion.minecraftArguments}`)
       // }
    })
})

function getClasspath(mcVersion: versions.Version, mcJar: string): string {
    var cp: string = ''
    for (var lib in mcVersion.libraries) {
        cp = cp + '\"' + versions.Library.getLibraryJarFromName(mcVersion.libraries[lib].name) + '\";'
    }
    cp = cp + '\"' + mcJar + '\", net.minecraft.launchwrapper.Launch'
    return cp
}
