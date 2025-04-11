// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.pascal-snake-casify', () => {
		const editor: any = vscode.window.activeTextEditor;

		// If there is no active selection, select the word under the cursor
		if (editor.selection.isEmpty) {
			const cursorPosition = editor.selection.active;
			const wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
			if (wordRange) {
				editor.selection = new vscode.Selection(wordRange.start, wordRange.end);
			}
		}

		const text = editor.document.getText(editor.selection);
		const words: any = text.match(/[\d\.]+|\D+/g);
		let result: any = [];
		words.forEach((word: any) => {
			result = result.concat(word.split(/(?=[A-Z])/));
		});
		editor.edit((editBuilder: any) => {
			const selection = editor.selection;
			editBuilder.replace(selection, result.join('_'));
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
