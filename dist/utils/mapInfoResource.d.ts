import { Manifest } from './xml-parser/ManifestParser';
/**
 * map file place with resourceMap
 * @param {Object} apkInfo // json info parsed from .apk file
 * @param {Object} resourceMap // resourceMap
 */
export declare function mapInfoResource(apkInfo: Manifest, resourceMap: any): Manifest;
