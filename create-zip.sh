#!/usr/bin/env bash
if ! command -v "npm" >/dev/null 2>&1; then
    echo "npm not found. Exiting"
    exit 1
fi
if ! command -v "zip" >/dev/null 2>&1; then
    echo "zip command not found. Exiting."
    exit 1
fi
extension_File_Name="CPH-Submit-chromium"
echo "Creating $extension_File_Name.zip"
echo "Executing npm webpack script"
npm run webpack
rm -fv $extension_File_Name.zip
zip -r $extension_File_Name.zip dist manifest.json icon-48.png
echo "Creating source-code.zip"
rm -fv source-code.zip
zip -r source-code.zip ./ -x "node_modules/*" "dist/*" *.zip ".git/*" "web-ext-artifacts/*"
echo "Done."
