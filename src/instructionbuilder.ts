/*
    Instruction builder for the TinyWallet.
    This abstraction mitigates issues from web3.js API changes.
*/
import { 
    PublicKey, 
    SystemProgram, 
    TransactionInstruction 
} from "@solana/web3.js";
import { 
    getAssociatedTokenAddress, 
    createTransferInstruction 
} from "@solana/spl-token";

export async function ix_Transfer(
    senderAccount: PublicKey, 
    receiverAccount: PublicKey, 
    amount: number
): Promise<TransactionInstruction> {
    return SystemProgram.transfer({
        fromPubkey: senderAccount,
        toPubkey: receiverAccount,
        lamports: amount,
    });
}

export async function ix_TransferSPL(
    senderAccount: PublicKey,
    receiverAccount: PublicKey,
    amount: number,
    tokenProgramId: PublicKey,
    mint: PublicKey
): Promise<TransactionInstruction> {
    // Derive the associated token accounts for the sender and receiver
    const senderTokenAccount = await getAssociatedTokenAddress(
        mint,
        senderAccount
    );

    const receiverTokenAccount = await getAssociatedTokenAddress(
        mint,
        receiverAccount
    );

    return createTransferInstruction(
        senderTokenAccount,
        receiverTokenAccount,
        senderAccount, // Assuming the sender is the owner of the senderTokenAccount
        amount,
        [],
        tokenProgramId
    );
}