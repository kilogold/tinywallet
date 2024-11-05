import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
export declare class TurnKeyManager implements KeyManager {
    private turnkeyClient;
    private turnkeySigner;
    constructor();
    generateKey?(): Promise<void>;
    purgeKey?(): void;
    getAddress(): Promise<string>;
    getPublicKey(): Promise<PublicKey>;
    sign(txn: VersionedTransaction): Promise<void>;
}
