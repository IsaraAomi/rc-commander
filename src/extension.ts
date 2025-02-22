// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('RC-Commander is now active!');

    const compressToTarGz = vscode.commands.registerCommand('rc-commander.compressToTarGz', (uri?: vscode.Uri) => {
        if (uri && uri.fsPath) {
            const folderPath = uri.fsPath;
            const folderName = path.basename(folderPath);
            const tarFilePath = path.join(path.dirname(folderPath), `${folderName}.tar.gz`);
            const command = `tar -czvf "${tarFilePath}" -C "${path.dirname(folderPath)}" "${folderName}"`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Compression failed: ${stderr}`);
                } else {
                    vscode.window.showInformationMessage(`Compressed to ${tarFilePath}`);
                }
            });
        } else {
            vscode.window.showErrorMessage("ToTarGz: No file or folder selected.");
            return;
        }
    });
    context.subscriptions.push(compressToTarGz);

    const helloWorldCommand = vscode.commands.registerCommand('rc-commander.helloWorld', (uri?: vscode.Uri) => {
        if (!uri) {
            vscode.window.showErrorMessage("Hello World: No file or folder selected.");
        return;
        }
        console.log(`Selected URI Scheme: ${uri.scheme}, Path: ${uri.fsPath}`);
        vscode.window.showInformationMessage(`Hello World! Selected: ${uri.fsPath}`);
    });
    context.subscriptions.push(helloWorldCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
