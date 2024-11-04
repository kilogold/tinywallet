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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerKeyManager = void 0;
const hw_transport_node_hid_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid"));
const hw_app_solana_1 = __importDefault(require("@ledgerhq/hw-app-solana"));
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const firstAccountPathSolana = "44'/501'/0'";
class LedgerKeyManager {
    constructor(solanaLedgerApp) {
        this.solanaLedgerApp = solanaLedgerApp;
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return new web3_js_1.PublicKey(yield this.getAddress());
        });
    }
    static createAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield hw_transport_node_hid_1.default.create();
            const ledger = new hw_app_solana_1.default(transport);
            return new LedgerKeyManager(ledger);
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const { address } = yield this.solanaLedgerApp.getAddress(firstAccountPathSolana);
            return bs58_1.default.encode(address);
        });
    }
    sign(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            const txBuffer = Buffer.from(txn.message.serialize());
            const { signature } = yield this.solanaLedgerApp.signTransaction(firstAccountPathSolana, txBuffer);
            txn.addSignature(new web3_js_1.PublicKey(yield this.getAddress()), signature);
        });
    }
}
exports.LedgerKeyManager = LedgerKeyManager;
//# sourceMappingURL=ledgerkeymanager.js.map