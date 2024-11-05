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
exports.TurnKeyManager = void 0;
const sdk_server_1 = require("@turnkey/sdk-server");
const solana_1 = require("@turnkey/solana");
const organizationId = process.env.ORGANIZATION_ID;
const turnkeyClient = new sdk_server_1.Turnkey({
    apiBaseUrl: process.env.BASE_URL,
    apiPublicKey: process.env.API_PUBLIC_KEY,
    apiPrivateKey: process.env.API_PRIVATE_KEY,
    defaultOrganizationId: organizationId,
});
const turnkeySigner = new solana_1.TurnkeySigner({
    organizationId,
    client: turnkeyClient.apiClient(),
});
class TurnKeyManager {
    generateKey() {
        throw new Error("Method not implemented.");
    }
    purgeKey() {
        throw new Error("Method not implemented.");
    }
    getAddress() {
        throw new Error("Method not implemented.");
    }
    getPublicKey() {
        throw new Error("Method not implemented.");
    }
    sign(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield turnkeySigner.signTransaction(txn, yield this.getAddress()));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TurnKeyManager = TurnKeyManager;
