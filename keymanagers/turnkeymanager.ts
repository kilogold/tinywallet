import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
import { TActivity, Turnkey } from "@turnkey/sdk-server";
import { TurnkeySigner } from "@turnkey/solana";

const organizationId = process.env.ORGANIZATION_ID!;

const turnkeyClient = new Turnkey({
  apiBaseUrl: process.env.BASE_URL!,
  apiPublicKey: process.env.API_PUBLIC_KEY!,
  apiPrivateKey: process.env.API_PRIVATE_KEY!,
  defaultOrganizationId: organizationId,
});

const turnkeySigner = new TurnkeySigner({
  organizationId,
  client: turnkeyClient.apiClient(),
});


export class TurnKeyManager implements KeyManager {
    generateKey?() {
        throw new Error("Method not implemented.");
    }
    purgeKey?() {
        throw new Error("Method not implemented.");
    }
    getAddress(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getPublicKey(): Promise<PublicKey> {
        throw new Error("Method not implemented.");
    }
    
    async sign(txn: VersionedTransaction) {

        try {
            return (await turnkeySigner.signTransaction(
                txn,
                await this.getAddress()
            )) as VersionedTransaction;

        } catch (error: any) {
            throw error;
        }
    }
}
