import Solana from "@ledgerhq/hw-app-solana";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
import { Command } from "commander";
export declare class LedgerKeyManager implements KeyManager {
    solanaLedgerApp: Solana;
    constructor(solanaLedgerApp: Solana);
    getPublicKey(): Promise<PublicKey>;
    populateCommands(program: Command): void;
    static createAsync(): Promise<LedgerKeyManager>;
    getAddress(): Promise<string>;
    sign(txn: VersionedTransaction): Promise<void>;
}
//# sourceMappingURL=ledgerkeymanager.d.ts.map