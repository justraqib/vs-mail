// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MultiStepInput } from './user_interface/multiStepInput';
import { Gmail } from './mail/Gmail';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-mail" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('vs-mail.refresh', () => {
		vscode.window.showInformationMessage('Enable refresh click');
	});
	vscode.commands.registerCommand('vs-mail.setupgmail', () => {
		let data: string = "hi"
		MultiStepInput.run(async (input) => {
			data = await input.showInputBox({
				title: 'Display Name',
                step: 1,
                totalSteps: 1,
                value: data,
                prompt: 'Input Gmail vendor display name, please',
				validate: (value: string) => new Promise<string>((resolve, reject) => {
					// noop
				}),
				shouldResume: () => new Promise<boolean>((resolve, reject) => {
					// noop
				}),
			});
			vscode.window.showInformationMessage(data);
		});
	});
	vscode.commands.registerCommand('vs-mail.setupother', () => {
		vscode.window.showInformationMessage('Know you other provider use');
	});
	// vscode.commands.registerCommand('vs-mail.setupMail', () => {
	// 	vscode.window.showInformationMessage('Enable setupMail click');
	// });
	let disposable = vscode.commands.registerCommand('vs-mail.setupMail', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		MultiStepInput.run(async (input) => {
			const option = await input.showQuickPick({
				title: 'create mail vendor',
				step: 1,
				totalSteps: 1,
				placeholder: 'mail vendor',
				items: [
					{
						label: 'gmail',
					},
					{
						label: 'other',
					},
				],
			});
			switch (option.label) {
				case 'gmail':
					vscode.commands.executeCommand('vs-mail.setupgmail');
					break;
				case 'other':
					vscode.commands.executeCommand('vs-mail.setupother');
					break;
				
			}
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
