"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoreType = void 0;
// config.ts
const fs = require("fs");
const path = require("path");
var KeystoreType;
(function (KeystoreType) {
    KeystoreType["Local"] = "local";
    KeystoreType["Ledger"] = "ledger";
    KeystoreType["Turnkey"] = "turnkey";
})(KeystoreType || (exports.KeystoreType = KeystoreType = {}));
class coreConfig {
    constructor(isNew = false) {
        this.rpcUrl = process.env.RPC_URL;
        this.commitment = process.env.COMMITMENT;
        this.keystoreType = process.env.KEYSTORE_TYPE;
        if (isNew) {
            console.log(`Deleting config file at ${this.getConfigPath()}`);
            fs.rmSync(this.getConfigPath(), { recursive: false, force: true });
        }
        else {
            console.log(`Reading config file at ${this.getConfigPath()}`);
            this.read();
        }
    }
    getConfigPath() {
        return process.env.CONFIG_PATH;
    }
    read() {
        const configPath = this.getConfigPath();
        if (fs.existsSync(configPath)) {
            const rawConfig = fs.readFileSync(configPath, 'utf-8');
            const fileConfig = JSON.parse(rawConfig);
            Object.assign(this, fileConfig);
        }
    }
    write() {
        const configPath = this.getConfigPath();
        const configDir = path.dirname(configPath);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        fs.writeFileSync(configPath, JSON.stringify(this, null, 2));
    }
}
const config = new coreConfig(false);
exports.default = config;
