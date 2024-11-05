"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ix_Transfer = ix_Transfer;
exports.ix_TransferSPL = ix_TransferSPL;
/*
    Instruction builder for the TinyWallet.
    This abstraction mitigates issues from web3.js API changes.
*/
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
function ix_Transfer(senderAccountStr, receiverAccountStr, amountStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderAccount = new web3_js_1.PublicKey(senderAccountStr);
        const receiverAccount = new web3_js_1.PublicKey(receiverAccountStr);
        const amount = BigInt(amountStr);
        return web3_js_1.SystemProgram.transfer({
            fromPubkey: senderAccount,
            toPubkey: receiverAccount,
            lamports: amount,
        });
    });
}
function ix_TransferSPL(senderAccountStr, receiverAccountStr, amountStr, tokenProgramIdStr, mintStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderAccount = new web3_js_1.PublicKey(senderAccountStr);
        const receiverAccount = new web3_js_1.PublicKey(receiverAccountStr);
        const amount = BigInt(amountStr);
        const tokenProgramId = new web3_js_1.PublicKey(tokenProgramIdStr);
        const mint = new web3_js_1.PublicKey(mintStr);
        // Derive the associated token accounts for the sender and receiver
        const senderTokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, senderAccount);
        const receiverTokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, receiverAccount);
        return (0, spl_token_1.createTransferInstruction)(senderTokenAccount, receiverTokenAccount, senderAccount, // Assuming the sender is the owner of the senderTokenAccount
        amount, [], tokenProgramId);
    });
}
