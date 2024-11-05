import { core } from '../src/core';
import { ix_Transfer } from '../src/instructionbuilder';
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { KeystoreType } from '../src/config';

describe('LocalKeyManager', () => {
    const TOTAL_AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL;
    let embeddedWallet: core;

    it('should generate a new key', async () => {
        embeddedWallet = await core.CreateAsync(KeystoreType.Local);
        embeddedWallet.keymanager.purgeKey!();
        embeddedWallet.keymanager.generateKey!();
    });

    it('should airdrop 1 SOL to generated key', async () => {        
        const pubkey = await embeddedWallet.keymanager.getPublicKey();

        await embeddedWallet.connection.requestAirdrop(pubkey, 1 * LAMPORTS_PER_SOL);

        // Wait manually to simulate airdrop confirmation
        await new Promise(resolve => setTimeout(resolve, 550));
    });

    it('should sign and submit a transaction', async () => {

        const amount = TOTAL_AIRDROP_AMOUNT / 10;
        const receiverAccount = Keypair.generate().publicKey;

        const ix = await ix_Transfer(await embeddedWallet.keymanager.getPublicKey(), receiverAccount, amount);
        const txn = await embeddedWallet.BuildTransaction([ix], await embeddedWallet.keymanager.getPublicKey());
        
        await embeddedWallet.SignTransaction(txn);

        const txId = await embeddedWallet.SendTransaction(txn);

        // Wait manually to simulate confirmation
        await new Promise(resolve => setTimeout(resolve, 550));          
    });
}); 