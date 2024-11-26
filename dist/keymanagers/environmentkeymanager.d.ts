import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
export declare class EnvironmentKeyManager implements KeyManager {
    private keypair;
    constructor();
    getAddress(): Promise<string>;
    getPublicKey(): Promise<PublicKey>;
    sign(txn: VersionedTransaction): void;
    generateKey?(): void;
    purgeKey?(): void;
}
