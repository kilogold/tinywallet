import { KeyManager, KeystoreType } from "./keymanager";
import { Connection, PublicKey, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
export { KeystoreType };
export * from "./instructionbuilder";
export declare class core {
    readonly keymanager: KeyManager;
    readonly connection: Connection;
    private constructor();
    static CreateAsync(keystoreType?: KeystoreType, connection?: Connection): Promise<core>;
    GetKeystoreType(): string;
    BuildTransaction(ix: TransactionInstruction[], payer: PublicKey): Promise<VersionedTransaction>;
    SignTransaction(txn: VersionedTransaction): Promise<void>;
    SendTransaction(txn: VersionedTransaction): Promise<string>;
}
