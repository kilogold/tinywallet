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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoreType = void 0;
// config.ts
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var KeystoreType;
(function (KeystoreType) {
    KeystoreType["Local"] = "local";
    KeystoreType["Ledger"] = "ledger";
    KeystoreType["Turnkey"] = "turnkey";
})(KeystoreType || (exports.KeystoreType = KeystoreType = {}));
var coreConfig = /** @class */ (function () {
    function coreConfig(isNew) {
        if (isNew === void 0) { isNew = false; }
        this.rpcUrl = process.env.RPC_URL;
        this.commitment = process.env.COMMITMENT;
        this.keystoreType = process.env.KEYSTORE_TYPE;
        if (isNew) {
            console.log("Deleting config file at ".concat(this.getConfigPath()));
            fs.rmSync(this.getConfigPath(), { recursive: false, force: true });
        }
        else {
            console.log("Reading config file at ".concat(this.getConfigPath()));
            this.read();
        }
    }
    coreConfig.prototype.getConfigPath = function () {
        return process.env.CONFIG_PATH;
    };
    coreConfig.prototype.read = function () {
        var configPath = this.getConfigPath();
        if (fs.existsSync(configPath)) {
            var rawConfig = fs.readFileSync(configPath, 'utf-8');
            var fileConfig = JSON.parse(rawConfig);
            Object.assign(this, fileConfig);
        }
    };
    coreConfig.prototype.write = function () {
        var configPath = this.getConfigPath();
        var configDir = path.dirname(configPath);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        fs.writeFileSync(configPath, JSON.stringify(this, null, 2));
    };
    return coreConfig;
}());
var config = new coreConfig(false);
exports.default = config;
