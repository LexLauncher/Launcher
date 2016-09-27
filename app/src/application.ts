import * as utils from "./utils.js";

$(document).ready(function () {
    $('#playButton').on('click', function() {
        console.log(utils.OperatingSystem.getMinecraftDataDirectory())
    })
})
