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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerKeyManager = void 0;
var hw_transport_node_hid_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid"));
var hw_app_solana_1 = __importDefault(require("@ledgerhq/hw-app-solana"));
var web3_js_1 = require("@solana/web3.js");
var bs58_1 = __importDefault(require("bs58"));
var firstAccountPathSolana = "44'/501'/0'";
var LedgerKeyManager = /** @class */ (function () {
    function LedgerKeyManager(solanaLedgerApp) {
        this.solanaLedgerApp = solanaLedgerApp;
    }
    LedgerKeyManager.prototype.getPublicKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = web3_js_1.PublicKey.bind;
                        return [4 /*yield*/, this.getAddress()];
                    case 1: return [2 /*return*/, new (_a.apply(web3_js_1.PublicKey, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    LedgerKeyManager.createAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transport, ledger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, hw_transport_node_hid_1.default.create()];
                    case 1:
                        transport = _a.sent();
                        ledger = new hw_app_solana_1.default(transport);
                        return [2 /*return*/, new LedgerKeyManager(ledger)];
                }
            });
        });
    };
    LedgerKeyManager.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.solanaLedgerApp.getAddress(firstAccountPathSolana)];
                    case 1:
                        address = (_a.sent()).address;
                        return [2 /*return*/, bs58_1.default.encode(address)];
                }
            });
        });
    };
    LedgerKeyManager.prototype.sign = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            var txBuffer, signature, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        txBuffer = Buffer.from(txn.message.serialize());
                        return [4 /*yield*/, this.solanaLedgerApp.signTransaction(firstAccountPathSolana, txBuffer)];
                    case 1:
                        signature = (_d.sent()).signature;
                        _b = (_a = txn).addSignature;
                        _c = web3_js_1.PublicKey.bind;
                        return [4 /*yield*/, this.getAddress()];
                    case 2:
                        _b.apply(_a, [new (_c.apply(web3_js_1.PublicKey, [void 0, _d.sent()]))(), signature]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return LedgerKeyManager;
}());
exports.LedgerKeyManager = LedgerKeyManager;
