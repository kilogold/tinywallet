import { PublicKey, VersionedTransaction } from "@solana/web3.js";

export enum KeystoreType {
    Local = "local",
    Ledger = "ledger",
    Turnkey = "turnkey"
}

export interface KeyManager {    
    generateKey?(): any;
    purgeKey?(): any;
    getAddress(): Promise<string>;
    getPublicKey(): Promise<PublicKey>;
    sign(txn: VersionedTransaction): any;
    
}