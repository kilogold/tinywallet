import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
export declare class LocalKeyManager implements KeyManager {
    keystorePath: string;
    constructor();
    purgeKey(): void;
    getAddress(): Promise<string>;
    generateKey(overwrite?: boolean): void;
    loadKey(): Keypair;
    getPublicKey(): Promise<PublicKey>;
    sign(txn: VersionedTransaction): void;
}
