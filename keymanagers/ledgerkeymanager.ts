import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
import Solana from "@ledgerhq/hw-app-solana";
import { Keypair, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Wallet } from "@coral-xyz/anchor";
import { KeyManager } from "../keymanager";
import bs58 from 'bs58';

const firstAccountPathSolana = "44'/501'/0'";

export class LedgerKeyManager implements KeyManager {

    solanaLedgerApp: Solana;

    constructor(solanaLedgerApp: Solana) {
        this.solanaLedgerApp = solanaLedgerApp;
    }
    async getPublicKey(): Promise<PublicKey> {
        return new PublicKey(await this.getAddress());
    }

    public static async createAsync(): Promise<LedgerKeyManager> {
        const transport = await TransportNodeHid.create();
        const ledger = new Solana(transport);
        return new LedgerKeyManager(ledger);
    }

    async getAddress(): Promise<string> {
        const {address} = await this.solanaLedgerApp.getAddress(firstAccountPathSolana);
        return bs58.encode(address);
    }
    async sign(txn: VersionedTransaction) {
        const txBuffer = Buffer.from(txn.message.serialize());
        
        const {signature} = await this.solanaLedgerApp.signTransaction(firstAccountPathSolana, txBuffer);

        txn.addSignature(new PublicKey(await this.getAddress()), signature);        
    }
}
