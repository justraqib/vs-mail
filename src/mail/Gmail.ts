import { MultiStepInput } from "../user_interface/multiStepInput";
import * as vscode from 'vscode';


export class Gmail {

    public static compile(context: vscode.ExtensionContext) {
        let data: any = {}
        MultiStepInput.run(async (input) => {
            data.display = await input.showInputBox({
                title: 'Display Name',
                step: 1,
                totalSteps: 2,
                value: data.dispaly,
                prompt: 'Input Gamil vendor display name',
            });

            data.user = await input.showInputBox({
                title: 'UserName',
                step: 2,
                totalSteps: 2,
                value: data.user,
                prompt: 'Input Gamil User Name',
            })
        })
    }

    
}