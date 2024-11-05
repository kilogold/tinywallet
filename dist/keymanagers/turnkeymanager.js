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
const web3_js_1 = require("@solana/web3.js");
const sdk_server_1 = require("@turnkey/sdk-server");
const solana_1 = require("@turnkey/solana");
class TurnKeyManager {
    constructor() {
        this.turnkeyClient = new sdk_server_1.Turnkey({
            apiBaseUrl: process.env.BASE_URL,
            apiPublicKey: process.env.API_PUBLIC_KEY,
            apiPrivateKey: process.env.API_PRIVATE_KEY,
            defaultOrganizationId: process.env.ORGANIZATION_ID,
        });
        this.turnkeySigner = new solana_1.TurnkeySigner({
            organizationId: process.env.ORGANIZATION_ID,
            client: this.turnkeyClient.apiClient(),
        });
    }
    generateKey() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.turnkeyClient.apiClient().createWalletAccounts({
                    accounts: [{
                            curve: "CURVE_ED25519",
                            pathFormat: "PATH_FORMAT_BIP32",
                            path: "m/44'/501'/0/0",
                            addressFormat: "ADDRESS_FORMAT_SOLANA",
                        }],
                    walletId: process.env.WALLET_ID,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    purgeKey() {
        throw new Error("Method not implemented.");
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const walletsResponse = yield this.turnkeyClient.apiClient().getWalletAccounts({
                organizationId: process.env.ORGANIZATION_ID,
                walletId: process.env.WALLET_ID,
            });
            return walletsResponse.accounts[0].address;
        });
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return new web3_js_1.PublicKey(yield this.getAddress());
        });
    }
    sign(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.turnkeySigner.addSignature(txn, yield this.getAddress());
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TurnKeyManager = TurnKeyManager;
