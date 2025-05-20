/// <reference types="node" />
export declare enum NodeType {
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    CDATA_SECTION_NODE = 4
}
export declare enum ChunkType {
    NULL = 0,
    STRING_POOL = 1,
    TABLE = 2,
    XML = 3,
    XML_FIRST_CHUNK = 256,
    XML_START_NAMESPACE = 256,
    XML_END_NAMESPACE = 257,
    XML_START_ELEMENT = 258,
    XML_END_ELEMENT = 259,
    XML_CDATA = 260,
    XML_LAST_CHUNK = 383,
    XML_RESOURCE_MAP = 384,
    TABLE_PACKAGE = 512,
    TABLE_TYPE = 513,
    TABLE_TYPE_SPEC = 514
}
export declare enum StringFlags {
    SORTED = 1,
    UTF8 = 256
}
export declare enum TypedValue {
    COMPLEX_MANTISSA_MASK = 16777215,
    COMPLEX_MANTISSA_SHIFT = 8,
    COMPLEX_RADIX_0p23 = 3,
    COMPLEX_RADIX_16p7 = 1,
    COMPLEX_RADIX_23p0 = 0,
    COMPLEX_RADIX_8p15 = 2,
    COMPLEX_RADIX_MASK = 3,
    COMPLEX_RADIX_SHIFT = 4,
    COMPLEX_UNIT_DIP = 1,
    COMPLEX_UNIT_FRACTION = 0,
    COMPLEX_UNIT_FRACTION_PARENT = 1,
    COMPLEX_UNIT_IN = 4,
    COMPLEX_UNIT_MASK = 15,
    COMPLEX_UNIT_MM = 5,
    COMPLEX_UNIT_PT = 3,
    COMPLEX_UNIT_PX = 0,
    COMPLEX_UNIT_SHIFT = 0,
    COMPLEX_UNIT_SP = 2,
    DENSITY_DEFAULT = 0,
    DENSITY_NONE = 65535,
    TYPE_ATTRIBUTE = 2,
    TYPE_DIMENSION = 5,
    TYPE_FIRST_COLOR_INT = 28,
    TYPE_FIRST_INT = 16,
    TYPE_FLOAT = 4,
    TYPE_FRACTION = 6,
    TYPE_INT_BOOLEAN = 18,
    TYPE_INT_COLOR_ARGB4 = 30,
    TYPE_INT_COLOR_ARGB8 = 28,
    TYPE_INT_COLOR_RGB4 = 31,
    TYPE_INT_COLOR_RGB8 = 29,
    TYPE_INT_DEC = 16,
    TYPE_INT_HEX = 17,
    TYPE_LAST_COLOR_INT = 31,
    TYPE_LAST_INT = 31,
    TYPE_NULL = 0,
    TYPE_REFERENCE = 1,
    TYPE_STRING = 3
}
export interface TypedValueObj {
    value: any;
    type: string;
    rawType: TypedValue;
}
export interface XmlCData {
    namespaceURI: string;
    nodeType: NodeType.CDATA_SECTION_NODE;
    nodeName: '#cdata';
    data: string;
    typedValue: TypedValueObj;
}
export interface XmlNode {
    namespaceURI: string;
    nodeType: NodeType.ELEMENT_NODE;
    nodeName: string;
    attributes: XmlAttribute[];
    childNodes: (XmlNode | XmlCData)[];
}
export interface XmlAttribute {
    namespaceURI: string;
    nodeType: NodeType.ATTRIBUTE_NODE;
    nodeName: string;
    name: string;
    value: string;
    typedValue: TypedValueObj;
}
export interface BinaryXmlParserOptions {
    debug?: boolean;
}
export interface Dimension {
    value: number;
    rawUnit: number;
    unit: string;
}
export interface Fraction {
    value: number;
    type: string;
    rawType: number;
}
export declare class BinaryXmlParser {
    buffer: Buffer;
    cursor: number;
    strings: string[];
    debug: boolean;
    document: XmlNode | null;
    parent: XmlNode | null;
    stack: XmlNode[];
    resources: number[];
    constructor(buffer: Buffer, options?: BinaryXmlParserOptions);
    readU8(): number;
    readU16(): number;
    readS32(): number;
    readU32(): number;
    readLength8(): number;
    readLength16(): number;
    readDimension(): Dimension;
    readFraction(): Fraction;
    readHex24(): string;
    readHex32(): string;
    readTypedValue(): TypedValueObj;
    convertIntToFloat(int: number): number;
    readString(encoding: string): string;
    readChunkHeader(): {
        startOffset: number;
        chunkType: number;
        headerSize: number;
        chunkSize: number;
    };
    readStringPool(header: {
        startOffset: any;
        chunkType: any;
        headerSize?: number;
        chunkSize: any;
        stringCount?: any;
        styleCount?: any;
        flags?: any;
        stringsStart?: any;
        stylesStart?: any;
    }): null;
    readResourceMap(header: {
        startOffset?: number;
        chunkType?: number;
        headerSize: any;
        chunkSize: any;
    }): null;
    readXmlNamespaceStart(): null;
    readXmlNamespaceEnd(): null;
    readXmlElementStart(): XmlNode;
    readXmlAttribute(): XmlAttribute;
    readXmlElementEnd(): null;
    readXmlCData(): XmlCData;
    readNull(header: {
        startOffset?: number;
        chunkType?: number;
        headerSize: any;
        chunkSize: any;
    }): null;
    parse(): XmlNode | null;
}
