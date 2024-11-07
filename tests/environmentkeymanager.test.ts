import { core } from '../src/core';
import { ix_Transfer } from '../src/instructionbuilder';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { KeystoreType } from '../src/keymanager';

describe('EnvironmentKeyManager', () => {
    const TOTAL_AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL;
    let embeddedWallet: core;

    beforeAll(async () => {
        process.env.KEYSTORE_TYPE = 'environment';
        embeddedWallet = await core.CreateAsync(KeystoreType.Environment);
    });

    it('should retrieve the address from the environment key', async () => {
        const address = await embeddedWallet.keymanager.getAddress();
        console.log(`address: ${address}`);
        expect(address).toBeDefined();
    });

    it('should airdrop 1 SOL to the environment key', async () => {
        const pubkey = await embeddedWallet.keymanager.getPublicKey();

        const signature = await embeddedWallet.connection.requestAirdrop(pubkey, TOTAL_AIRDROP_AMOUNT);

        // Wait manually to simulate airdrop confirmation
        await new Promise(resolve => setTimeout(resolve, 550));

        expect(signature).toBeDefined();
    });

    it('should sign and submit a transaction', async () => {
        const amount = TOTAL_AIRDROP_AMOUNT / 10;
        const receiverAccount = Keypair.generate().publicKey;

        const ix = await ix_Transfer(
            (await embeddedWallet.keymanager.getPublicKey()).toBase58(),
            receiverAccount.toBase58(),
            amount.toString()
        );
        const txn = await embeddedWallet.BuildTransaction([ix], await embeddedWallet.keymanager.getPublicKey());

        await embeddedWallet.SignTransaction(txn);

        const txId = await embeddedWallet.SendTransaction(txn);

        // Wait manually to simulate confirmation
        await new Promise(resolve => setTimeout(resolve, 550));

        console.log(`txId: ${txId}`);
        expect(txId).toBeDefined();
    });
}); 