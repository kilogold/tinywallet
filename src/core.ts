import { KeyManager } from "./keymanager";
import { Commitment, Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { KeystoreType } from "./keymanager";
import { LedgerKeyManager } from './keymanagers/ledgerkeymanager';
import { LocalKeyManager } from './keymanagers/localkeymanager';
import { TurnKeyManager } from "./keymanagers/turnkeymanager";

// Re-exports
export { KeystoreType };
export * from "./instructionbuilder";

export class core {

    readonly keymanager: KeyManager;
    readonly connection: Connection;

    constructor(
        keymanager: KeyManager,
        connection: Connection = new Connection(
            process.env.RPC_URL!,
            process.env.COMMITMENT! as Commitment
        )
    ) {
        this.keymanager = keymanager;
        this.connection = connection;
    }

    static async CreateAsync(keystoreType: KeystoreType = process.env.KEYSTORE_TYPE as KeystoreType) {
        let keymanager: KeyManager;

        switch (keystoreType) {
            case KeystoreType.Local:
                keymanager = new LocalKeyManager();
                break;
            case KeystoreType.Ledger:
                keymanager = await LedgerKeyManager.createAsync();
                break;
            case KeystoreType.Turnkey:
                keymanager = new TurnKeyManager();
                break;
            default:
                throw new Error(`Unsupported keystore type.`);
        }

        return new core(keymanager!);
    }

    GetKeystoreType() {
        return process.env.KEYSTORE_TYPE;
    }

    async BuildTransaction(ix: TransactionInstruction[], payer: PublicKey) {

        const connection = this.connection;

        // create v0 compatible message
        let {blockhash} = await connection.getLatestBlockhash();
        const messageV0 = new TransactionMessage({
            payerKey: payer,
            recentBlockhash: blockhash,
            instructions: ix,
        }).compileToV0Message();

        return new VersionedTransaction(messageV0);
    }

    async SignTransaction(txn: VersionedTransaction) {
        // Sign a transaction using keymanager.
        await this.keymanager.sign(txn);
    }

    async SendTransaction(txn: VersionedTransaction) {
        // Send a transaction to the network.
        return this.connection.sendTransaction(txn);
    }
}