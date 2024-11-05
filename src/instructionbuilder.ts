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
    senderAccountStr: string, 
    receiverAccountStr: string, 
    amountStr: string
): Promise<TransactionInstruction> {
    const senderAccount = new PublicKey(senderAccountStr);
    const receiverAccount = new PublicKey(receiverAccountStr);
    const amount = BigInt(amountStr);

    return SystemProgram.transfer({
        fromPubkey: senderAccount,
        toPubkey: receiverAccount,
        lamports: amount,
    });
}

export async function ix_TransferSPL(
    senderAccountStr: string,
    receiverAccountStr: string,
    amountStr: string,
    tokenProgramIdStr: string,
    mintStr: string
): Promise<TransactionInstruction> {
    const senderAccount = new PublicKey(senderAccountStr);
    const receiverAccount = new PublicKey(receiverAccountStr);
    const amount = BigInt(amountStr);
    const tokenProgramId = new PublicKey(tokenProgramIdStr);
    const mint = new PublicKey(mintStr);

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