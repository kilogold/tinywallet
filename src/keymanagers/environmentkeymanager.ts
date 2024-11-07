import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";

export class EnvironmentKeyManager implements KeyManager {
    private keypair: Keypair;

    constructor() {
        const secretKey = process.env.ENV_PRIVATE_KEY;
        if (!secretKey) {
            throw new Error("ENV_PRIVATE_KEY is not set in the environment variables.");
        }
        const secretKeyArray = Uint8Array.from(JSON.parse(secretKey));
        this.keypair = Keypair.fromSecretKey(secretKeyArray);
    }

    async getAddress(): Promise<string> {
        return this.keypair.publicKey.toBase58();
    }

    async getPublicKey(): Promise<PublicKey> {
        return this.keypair.publicKey;
    }

    sign(txn: VersionedTransaction) {
        txn.sign([this.keypair]);
    }

    // Optional methods can be implemented if needed
    generateKey?(): void {
        throw new Error("generateKey is not supported in EnvironmentKeyManager.");
    }

    purgeKey?(): void {
        throw new Error("purgeKey is not supported in EnvironmentKeyManager.");
    }
} 