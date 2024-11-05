"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.core = void 0;
var web3_js_1 = require("@solana/web3.js");
var config_1 = __importStar(require("./config"));
var ledgerkeymanager_1 = require("./keymanagers/ledgerkeymanager");
var localkeymanager_1 = require("./keymanagers/localkeymanager");
var turnkeymanager_1 = require("./keymanagers/turnkeymanager");
// Re-exports
//export { KeystoreType };
var core = /** @class */ (function () {
    function core(keymanager) {
        this.keymanager = keymanager;
        this.connection = new web3_js_1.Connection(config_1.default.rpcUrl, config_1.default.commitment);
    }
    core.CreateAsync = function () {
        return __awaiter(this, arguments, void 0, function (keystoreType) {
            var keymanager, _a;
            if (keystoreType === void 0) { keystoreType = config_1.default.keystoreType; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = keystoreType;
                        switch (_a) {
                            case config_1.KeystoreType.Local: return [3 /*break*/, 1];
                            case config_1.KeystoreType.Ledger: return [3 /*break*/, 2];
                            case config_1.KeystoreType.Turnkey: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        keymanager = new localkeymanager_1.LocalKeyManager();
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, ledgerkeymanager_1.LedgerKeyManager.createAsync()];
                    case 3:
                        keymanager = _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        keymanager = new turnkeymanager_1.TurnKeyManager();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("Unsupported keystore type.");
                    case 6: return [2 /*return*/, new core(keymanager)];
                }
            });
        });
    };
    core.prototype.GetKeystoreType = function () {
        return config_1.default.keystoreType;
    };
    core.prototype.SetKeystoreType = function (keystoreType) {
        // Assert string is a valid enum value
        if (!Object.values(config_1.KeystoreType).includes(keystoreType)) {
            throw new Error("Unsupported keystore type: ".concat(keystoreType));
        }
        config_1.default.keystoreType = keystoreType;
        config_1.default.write();
    };
    core.prototype.BuildTransaction = function (ix, payer) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, blockhash, messageV0;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = this.connection;
                        return [4 /*yield*/, connection.getLatestBlockhash()];
                    case 1:
                        blockhash = (_a.sent()).blockhash;
                        messageV0 = new web3_js_1.TransactionMessage({
                            payerKey: payer,
                            recentBlockhash: blockhash,
                            instructions: ix,
                        }).compileToV0Message();
                        return [2 /*return*/, new web3_js_1.VersionedTransaction(messageV0)];
                }
            });
        });
    };
    core.prototype.SignTransaction = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Sign a transaction using keymanager.
                    return [4 /*yield*/, this.keymanager.sign(txn)];
                    case 1:
                        // Sign a transaction using keymanager.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    core.prototype.SendTransaction = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Send a transaction to the network.
                return [2 /*return*/, this.connection.sendTransaction(txn)];
            });
        });
    };
    return core;
}());
exports.core = core;