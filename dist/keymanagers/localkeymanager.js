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
exports.LocalKeyManager = void 0;
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
class LocalKeyManager {
    constructor() {
        this.keystorePath = "./default_key.json";
    }
    purgeKey() {
        if (fs_1.default.existsSync(this.keystorePath)) {
            fs_1.default.unlinkSync(this.keystorePath);
        }
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.loadKey().publicKey.toBase58());
                }
                catch (e) {
                    reject();
                }
            });
        });
    }
    generateKey(overwrite = false) {
        if (fs_1.default.existsSync(this.keystorePath) && !overwrite) {
            throw new Error("Keystore file already exists. Use overwrite flag to overwrite the file.");
        }
        const kp = web3_js_1.Keypair.generate();
        // Write the private key to file using the keystorePath.
        fs_1.default.writeFileSync(this.keystorePath, `[${kp.secretKey}]`);
    }
    loadKey() {
        const secret = JSON.parse(fs_1.default.readFileSync(this.keystorePath).toString());
        const secretKey = Uint8Array.from(secret);
        return web3_js_1.Keypair.fromSecretKey(secretKey);
    }
    getPublicKey() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.loadKey().publicKey);
            }
            catch (e) {
                reject();
            }
        });
    }
    sign(txn) {
        txn.sign([this.loadKey()]);
    }
}
exports.LocalKeyManager = LocalKeyManager;
