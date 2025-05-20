/**
 * Code translated from a C# project https://github.com/hylander0/Iteedee.ApkReader/blob/master/Iteedee.ApkReader/ApkResourceFinder.cs
 *
 * Decode binary file `resources.arsc` from a .apk file to a JavaScript Object.
 */
import ByteBuffer from 'bytebuffer';
export interface ManifestResourceConfig {
    language: string;
    region: string;
    locate: string;
}
export declare class ResourceFinder {
    valueStringPool: string[];
    typeStringPool: string[];
    keyStringPool: string[];
    packageId: number;
    responseMap: {
        [n: number]: any;
        [x: string]: any;
    };
    entryMap: {
        [n: number]: any;
        [x: string]: any;
    };
    constructor();
    /**
     * Same to C# BinaryReader.readBytes
     *
     * @param bb ByteBuffer
     * @param len length
     * @returns {Buffer}
     */
    static readBytes(bb: ByteBuffer, len: number): ByteBuffer;
    /**
     *
     * @param {ByteBuffer} bb
     * @return {Map<String, Set<String>>}
     */
    processResourceTable(resourceBuffer: ArrayBuffer): {
        [x: string]: any;
        [n: number]: any;
    };
    private processPackage;
    processConfig(bb: ByteBuffer): ManifestResourceConfig;
    private processType;
    private processStringPool;
    processTypeSpec(bb: ByteBuffer): void;
    putIntoMap(resId: string, value: string, config: ManifestResourceConfig): void;
}
