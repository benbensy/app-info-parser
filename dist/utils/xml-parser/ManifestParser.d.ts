/// <reference types="node" />
import { BinaryXmlParser, BinaryXmlParserOptions, XmlNode } from './BinaryXmlParser';
export interface Manifest {
    versionCode: number;
    versionName: string;
    package: string;
    usesPermissions: any[];
    permissions: any[];
    permissionTrees: any[];
    permissionGroups: any[];
    instrumentation: null;
    usesSdk: {
        minSdkVersion: number;
        targetSdkVersion: number;
    };
    usesConfiguration: null;
    usesFeatures: any[];
    supportsScreens: null;
    compatibleScreens: any[];
    supportsGlTextures: any[];
    application: {
        theme: string;
        label: {
            value: string;
            locate: string;
        }[];
        icon: {
            value: string;
        }[];
        debuggable: boolean;
        allowBackup: boolean;
        activities: Activities[];
        activityAliases: any[];
        launcherActivities: Activities[];
        services: any[];
        receivers: any[];
        providers: any[];
        usesLibraries: any[];
    };
    icon: string | null;
}
export interface IntentFilterAction {
    name: string;
}
export interface IntentFilterCategory {
    name: string;
}
export interface IntentFilter {
    actions: IntentFilterAction[];
    categories: IntentFilterCategory[];
    data: any[];
}
export interface Activities {
    label: string;
    name: string;
    intentFilters: IntentFilter[];
    metaData: any[];
}
export declare class ManifestParser {
    buffer: Buffer;
    xmlParser: BinaryXmlParser;
    constructor(buffer: Buffer, options?: BinaryXmlParserOptions);
    collapseAttributes(element: XmlNode): any;
    parseIntents(element: XmlNode, target: {
        intentFilters: any[];
        metaData: any[];
    }): void;
    parseApplication(element: XmlNode): any;
    isLauncherActivity(activity: Activities): boolean;
    parse(): any;
}
