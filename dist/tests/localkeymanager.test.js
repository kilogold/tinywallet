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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../src/core");
var instructionbuilder_1 = require("../src/instructionbuilder");
var web3_js_1 = require("@solana/web3.js");
var config_1 = require("../src/config");
describe('LocalKeyManager', function () {
    var TOTAL_AIRDROP_AMOUNT = 1 * web3_js_1.LAMPORTS_PER_SOL;
    var embeddedWallet;
    it('should generate a new key', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.core.CreateAsync(config_1.KeystoreType.Local)];
                case 1:
                    embeddedWallet = _a.sent();
                    embeddedWallet.keymanager.purgeKey();
                    embeddedWallet.keymanager.generateKey();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should airdrop 1 SOL to generated key', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pubkey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, embeddedWallet.keymanager.getPublicKey()];
                case 1:
                    pubkey = _a.sent();
                    return [4 /*yield*/, embeddedWallet.connection.requestAirdrop(pubkey, 1 * web3_js_1.LAMPORTS_PER_SOL)];
                case 2:
                    _a.sent();
                    // Wait manually to simulate airdrop confirmation
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 550); })];
                case 3:
                    // Wait manually to simulate airdrop confirmation
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should sign and submit a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var amount, receiverAddr, ix, txn, _a, _b, _c, txId;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    amount = TOTAL_AIRDROP_AMOUNT / 10;
                    receiverAddr = web3_js_1.Keypair.generate().publicKey.toBase58();
                    return [4 /*yield*/, (0, instructionbuilder_1.ix_Transfer)(embeddedWallet, receiverAddr, amount)];
                case 1:
                    ix = _d.sent();
                    _b = (_a = embeddedWallet).BuildTransaction;
                    _c = [ix];
                    return [4 /*yield*/, embeddedWallet.keymanager.getPublicKey()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    txn = _d.sent();
                    return [4 /*yield*/, embeddedWallet.SignTransaction(txn)];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, embeddedWallet.SendTransaction(txn)];
                case 5:
                    txId = _d.sent();
                    // Wait manually to simulate confirmation
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 550); })];
                case 6:
                    // Wait manually to simulate confirmation
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
