import { Commitment } from '@solana/web3.js';
export declare enum KeystoreType {
    Local = "local",
    Ledger = "ledger",
    Turnkey = "turnkey"
}
declare class coreConfig {
    rpcUrl: string;
    commitment: Commitment;
    keystoreType: KeystoreType;
    constructor(isNew?: boolean);
    private getConfigPath;
    private read;
    write(): void;
}
declare const config: coreConfig;
export default config;
