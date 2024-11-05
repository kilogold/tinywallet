import { core } from '../src/core';
import { ix_Transfer } from '../src/instructionbuilder';
import { BlockheightBasedTransactionConfirmationStrategy, Commitment, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { KeystoreType } from '../src/config';

describe('LocalKeyManager', () => {
    const TOTAL_AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL;
    let embeddedWallet: core;

    it('should generate a new key', async () => {
        embeddedWallet = await core.CreateAsync(KeystoreType.Local);
        embeddedWallet.keymanager.purgeKey();
        embeddedWallet.keymanager.generateKey();
    });

    it('should airdrop 1 SOL to generated key', async () => {        
        const pubkey = await embeddedWallet.keymanager.getPublicKey();

        const signature = await embeddedWallet.connection.requestAirdrop(pubkey, 1 * LAMPORTS_PER_SOL);

        // Wait manually to simulate airdrop confirmation
        await new Promise(resolve => setTimeout(resolve, 550));


        // let confirmed = false;
        // const POLL_INTERVAL = 50;
        // while (!confirmed) {
        //     const {value: status} = await embeddedWallet.connection.getSignatureStatuses([signature]);
            
        //     if (status && status[0] && status[0].err === null && status[0].confirmationStatus === (process.env.COMMITMENT as Commitment)) {
        //         confirmed = true;
        //     } else {
        //         console.log(`confirmations: ${status[0]?.confirmations}`);
        //         console.log(`confirmationStatus: ${status[0]?.confirmationStatus}`);

        //         await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
        //     }
        // }
    });

    it('should sign and submit a transaction', async () => {

        const amount = TOTAL_AIRDROP_AMOUNT/10;
        const receiverAddr = Keypair.generate().publicKey.toBase58();

        const ix = await ix_Transfer(embeddedWallet, receiverAddr, amount);
        const txn = await embeddedWallet.BuildTransaction(ix, await embeddedWallet.keymanager.getPublicKey());
        
        await embeddedWallet.SignTransaction(txn);

        const txId = await embeddedWallet.SendTransaction(txn);

        // Wait manually to simulate confirmation
        await new Promise(resolve => setTimeout(resolve, 550));          
    });
}); 