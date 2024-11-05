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
const localkeymanager_1 = require("../localkeymanager");
describe('LocalKeyManager', () => {
    let keyManager;
    beforeEach(() => {
        keyManager = new localkeymanager_1.LocalKeyManager();
    });
    it('should stub generate a new key', () => {
        // Stub test
        expect(true).toBe(true);
    });
    it('should stub get the address', () => __awaiter(void 0, void 0, void 0, function* () {
        // Stub test
        expect(true).toBe(true);
    }));
    it('should stub sign a transaction', () => {
        // Stub test
        expect(true).toBe(true);
    });
});
