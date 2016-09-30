import * as utils from "./utils.js"

import fs = require('fs')

export interface Version {

    /**
     * The version of Minecraft.
     */
    id: string

    /**
     * The arguments used to launch Minecraft.
     */
    minecraftArguments: string

    /**
     * Gets the version's main class.
     */
    mainClass: string

    /**
     * The libraries required for Minecraft to launch.
     */
    libraries: Array<Library>
    
}

export namespace Version {

    /**
     * Gets the version object for the given version.
     */
    export function getVersion(version: string): Version {
        return JSON.parse(fs.readFileSync(utils.OperatingSystem.getMinecraftDataDirectory() + '/versions/' + version + '/' + version + '.json', 'utf-8'))
    }

    /**
     * Gets the location to the jar for the given version.
     */
    export function getVersionJar(version: string): string {
        return utils.OperatingSystem.getMinecraftDataDirectory() + '/versions/' + version + '/' + version + '.jar'
    }

}

export interface Library {

    /**
     * The name of the library
     */
     name: string

}

export namespace Library {

    /**
     * Gets the jar for the given library name.
     */
    export function getLibraryJarFromName(name: string) {
        var split = name.split(':')
        return utils.OperatingSystem.getMinecraftDataDirectory() + '/libraries/' +  utils.StringUtils.replaceAll(split[0], '.', '/') + '/' + split[1] + '/' + split[2] + '/' + split[1] + '-' + split[2] + '.jar'
    }

}
