"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class Chairman extends User_1.default {
    constructor(name, email, password, id, createdAt) {
        super(name, email, password, id, createdAt); // Call the parent class constructor
    }
    DoCall() {
        //
    }
    DoTraining() {
        //
    }
    DoEvent() {
        //
    }
    DoElection() {
        //
    }
}
exports.default = Chairman;
