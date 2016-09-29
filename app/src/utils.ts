import os = require('os')
import fs = require('fs')

export enum OperatingSystem {

    /**
     * Windows
     */
    WINDOWS,

    /**
     * MacOS
     */
    MACOS,
    
    /**
     * Linux (or rather anything other than Windows or MacOS)
     */
    LINUX

}

export namespace OperatingSystem {

    /**
     * Gets the operating system the machine is running.
     */
    export function getOS() {
        if (os.platform() === 'win32') {
            return OperatingSystem.WINDOWS;
        } else if (os.platform() === 'darwin') {
            return OperatingSystem.MACOS
        } else {
            return OperatingSystem.LINUX
        }
    }

    /**
     * Gets the Minecraft data directory.
     */
    export function getMinecraftDataDirectory() {
        switch (OperatingSystem.getOS()) {
            case OperatingSystem.WINDOWS:
                return process.env['APPDATA'] + '/.minecraft'
            case OperatingSystem.MACOS:
                return os.homedir() + '/Library/Application Support/minecraft'
            default:
                return os.homedir() + '/minecraft'
        }
    }

    /**
     * Gets the LexLauncher data directory.
     */
    export function getLexLauncherDataDirectory() {
        switch (OperatingSystem.getOS()) {
            case OperatingSystem.WINDOWS:
                return process.env['APPDATA'] + '/.lexlauncher'
            case OperatingSystem.MACOS:
                return os.homedir() + '/Library/Application Support/lexlauncher'
            default:
                return os.homedir() + '/lexlauncher'
        }
    }

}

export namespace FileUtils {

    /**
     * Creates the directory given if it doesn't currently exist.
     */
    export function createDirectoryIfNotExists(dir: string) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

}

export namespace StringUtils {

    export function replaceAll(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    }

}
