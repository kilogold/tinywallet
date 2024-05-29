import { Commitment } from '@solana/web3.js';
export declare enum KeystoreType {
    Local = "local",
    Ledger = "ledger"
}
declare class coreConfig {
    rpcUrl: string;
    commitment: Commitment;
    keystoreType: KeystoreType;
    constructor();
    private getConfigPath;
    private read;
    write(): void;
}
declare const config: coreConfig;
export default config;
//# sourceMappingURL=config.d.ts.map