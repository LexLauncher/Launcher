import os = require('os')

enum OperatingSystem {

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

namespace OperatingSystem {

    /**
     * Gets the operating system the machine is running.
     */
    export function getOS() {
        if (os.platform() === 'win32') {
            return OperatingSystem.WINDOWS;
        } else if (os.platform() === 'darwin') {
            return OperatingSystem.MACOS
        } else {
            return OperatingSystem.LINUX;
        }
    }

}
