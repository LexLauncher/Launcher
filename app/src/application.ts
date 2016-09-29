import * as utils from "./utils.js";

// Lets ensure that the relevant directories exist.
utils.FileUtils.createDirectoryIfNotExists(utils.OperatingSystem.getMinecraftDataDirectory())
utils.FileUtils.createDirectoryIfNotExists(utils.OperatingSystem.getLexLauncherDataDirectory())

// Let's wait for the page to load.
$(document).ready(function () {
    $('#playButton').on('click', function() {
        console.log(utils.OperatingSystem.getMinecraftDataDirectory())
    })
})
