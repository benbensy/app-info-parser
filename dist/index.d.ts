import { ExtensionNameEnum } from './utils/getExtensionName';
import { Zip } from './utils/Zip';
export declare type AppFile = File | string;
export default class AppInfoParser {
    file: AppFile;
    type: ExtensionNameEnum;
    parser: Zip;
    constructor(file: AppFile);
    parse(): Promise<unknown>;
}
