import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { KeyManager } from "../keymanager";
import { TActivity, Turnkey } from "@turnkey/sdk-server";
import { TurnkeySigner } from "@turnkey/solana";

export class TurnKeyManager implements KeyManager {
    private turnkeyClient: Turnkey;
    private turnkeySigner: TurnkeySigner;
    
    constructor() {
        
        this.turnkeyClient = new Turnkey({
            apiBaseUrl: process.env.BASE_URL!,
            apiPublicKey: process.env.API_PUBLIC_KEY!,
            apiPrivateKey: process.env.API_PRIVATE_KEY!,
            defaultOrganizationId: process.env.ORGANIZATION_ID!,
        });

        this.turnkeySigner = new TurnkeySigner({
            organizationId: process.env.ORGANIZATION_ID!,
            client: this.turnkeyClient.apiClient(),
        });
    }

    async generateKey?() {
        try {
            await this.turnkeyClient.apiClient().createWalletAccounts({
                accounts: [{
                curve: "CURVE_ED25519",
                pathFormat: "PATH_FORMAT_BIP32",
                path: "m/44'/501'/0/0",
                addressFormat: "ADDRESS_FORMAT_SOLANA",
            }],
                walletId: process.env.WALLET_ID!,
            });
        } catch (error: any) {
            throw error;
        }
    }
    purgeKey?() {
        throw new Error("Method not implemented.");
    }
    async getAddress(): Promise<string> {
        const walletsResponse = await this.turnkeyClient.apiClient().getWalletAccounts({
            organizationId: process.env.ORGANIZATION_ID!,
            walletId: process.env.WALLET_ID!,
        });

        return walletsResponse.accounts[0].address;
    }
    async getPublicKey(): Promise<PublicKey> {
        return new PublicKey(await this.getAddress());
    }
    
    async sign(txn: VersionedTransaction) {
        try {
            await this.turnkeySigner.addSignature(
                txn,
                await this.getAddress()
            );

        } catch (error: any) {
            throw error;
        }
    }
}
