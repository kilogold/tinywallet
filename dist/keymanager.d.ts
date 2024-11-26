import { PublicKey, VersionedTransaction } from "@solana/web3.js";
export declare enum KeystoreType {
    Local = "local",
    Ledger = "ledger",
    Turnkey = "turnkey",
    Environment = "environment"
}
export interface KeyManager {
    generateKey?(): any;
    purgeKey?(): any;
    getAddress(): Promise<string>;
    getPublicKey(): Promise<PublicKey>;
    sign(txn: VersionedTransaction): any;
}
