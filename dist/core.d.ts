import { KeyManager } from "./keymanager";
import { Connection, PublicKey, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
import { KeystoreType } from "./keymanager";
export { KeystoreType };
export * from "./instructionbuilder";
export declare class core {
    readonly keymanager: KeyManager;
    readonly connection: Connection;
    constructor(keymanager: KeyManager, connection?: Connection);
    static CreateAsync(keystoreType?: KeystoreType): Promise<core>;
    GetKeystoreType(): string;
    BuildTransaction(ix: TransactionInstruction[], payer: PublicKey): Promise<VersionedTransaction>;
    SignTransaction(txn: VersionedTransaction): Promise<void>;
    SendTransaction(txn: VersionedTransaction): Promise<string>;
}
