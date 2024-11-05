import { PublicKey, TransactionInstruction } from "@solana/web3.js";
export declare function ix_Transfer(senderAccount: PublicKey, receiverAccount: PublicKey, amount: number): Promise<TransactionInstruction>;
export declare function ix_TransferSPL(senderAccount: PublicKey, receiverAccount: PublicKey, amount: number, tokenProgramId: PublicKey, mint: PublicKey): Promise<TransactionInstruction>;
