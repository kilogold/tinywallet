import { KeyManager } from "./keymanager";
import { Connection, PublicKey, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
import { KeystoreType } from "./config";
export { KeystoreType };
export declare class core {
    readonly keymanager: KeyManager;
    readonly connection: Connection;
    constructor(keymanager: KeyManager);
    static CreateAsync(keystoreType?: KeystoreType): Promise<core>;
    GetKeystoreType(): KeystoreType;
    SetKeystoreType(keystoreType: string): void;
    BuildTransaction(ix: TransactionInstruction[], payer: PublicKey): Promise<VersionedTransaction>;
    SignTransaction(txn: VersionedTransaction): Promise<void>;
    SendTransaction(txn: VersionedTransaction): Promise<string>;
}
