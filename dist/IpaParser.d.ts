import { Zip } from './utils/Zip';
import { IpaInfoType } from './types';
export default class IpaParser extends Zip {
    /**
     * parser for parsing .ipa file
     * @param {String | File | Blob} file // file's path in Node, instance of File or Blob in Browser
     */
    constructor(file: string | File | Blob);
    parse(): Promise<IpaInfoType>;
    /**
     * Parse plist
     * @param {Buffer} buffer // plist file's buffer
     */
    private parsePlist;
    /**
     * parse provision
     * @param {Buffer} buffer // provision file's buffer
     */
    private parseProvision;
}
