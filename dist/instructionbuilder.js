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
const web3_js_1 = require("@solana/web3.js");
function ix_Transfer(embeddedWallet, receiverAddr, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        return [
            web3_js_1.SystemProgram.transfer({
                fromPubkey: yield embeddedWallet.keymanager.getPublicKey(),
                toPubkey: new web3_js_1.PublicKey(receiverAddr),
                lamports: amount,
            }),
        ];
    });
}
//# sourceMappingURL=instructionbuilder.js.map