import { Zip } from './utils/Zip';
import { ApkInfoType } from './types';
export default class ApkParser extends Zip {
    result: {};
    constructor(file: string | File | Blob);
    parse(): Promise<ApkInfoType>;
    private parseManifest;
    private parseResourceMap;
}
