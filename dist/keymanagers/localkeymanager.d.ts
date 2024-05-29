import web3js from "@solana/web3.js";
import { KeyManager } from "../keymanager";
export declare class LocalKeyManager implements KeyManager {
    keystorePath: string;
    constructor();
    purgeKey(): void;
    getAddress(): Promise<string>;
    generateKey(overwrite?: boolean): void;
    loadKey(): web3js.Keypair;
    getPublicKey(): Promise<web3js.PublicKey>;
    sign(txn: web3js.VersionedTransaction): void;
}
//# sourceMappingURL=localkeymanager.d.ts.map