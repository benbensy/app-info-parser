import { Manifest } from './xml-parser/ManifestParser';
/**
 * find .apk file's icon path from json info
 * @param info // json info parsed from .apk file
 */
export declare function findApkIconPath(info: Manifest): string;
