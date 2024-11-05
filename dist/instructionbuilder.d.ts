import { TransactionInstruction } from "@solana/web3.js";
export declare function ix_Transfer(senderAccountStr: string, receiverAccountStr: string, amountStr: string): Promise<TransactionInstruction>;
export declare function ix_TransferSPL(senderAccountStr: string, receiverAccountStr: string, amountStr: string, tokenProgramIdStr: string, mintStr: string): Promise<TransactionInstruction>;
