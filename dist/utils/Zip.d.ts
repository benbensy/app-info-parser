/// <reference types="node" />
export declare abstract class Zip {
    file: string | File | Blob;
    unzip: any;
    constructor(file: string | File | Blob);
    abstract parse(): Promise<unknown>;
    getEntries(regexps: RegExp[], type?: string): Promise<Record<string, Buffer>>;
    getEntry(regex: RegExp | string, type?: string): Promise<Buffer>;
}
