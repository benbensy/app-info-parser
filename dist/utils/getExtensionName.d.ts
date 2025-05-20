export declare enum ExtensionNameEnum {
    IPA = 0,
    APK = 1,
    OTHER = -1
}
/**
 * get file extension
 * @param str - file name string
 */
export declare function getExtensionName(str: string): ExtensionNameEnum;
