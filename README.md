# Minecraft Recipe Viewer
A nice way to visualize recipes from modded Minecraft.

## Images
[Imgur album](https://imgur.com/a/H1vXE)

## Downloads
Check the releases tab for the latest binaries.
Currently x86_64 only, but you can request x86 binaries if needed.

Windows users can run the installer, I tested it in wine and it worked.
Linux users can use the AppImage. Alternative packages or binaries can be requested if your distribution doesn't support AppImage.
Mac users can download the zip containing a .app file. I can't provide .dmg files unfortunately, neither am I able to test the current binary for OS X.

## Building from source
Clone the repository and run `yarn install` (or `npm install` if you prefer for some reason).
Then you can use [electron-builder](https://github.com/electron-userland/electron-builder) to build binaries. electron-builder is already included and configured.