"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chairman_1 = __importDefault(require("./Chairman")); // Import the Chairman subclass
const Head_1 = __importDefault(require("./Head")); // Import the Head subclass
const Volunteer_1 = __importDefault(require("./Volunteer")); // Import the Volunteer subclass
const Outsider_1 = __importDefault(require("./Outsider"));
class UserFactory {
    createUser(name, email, password, id, createdAt, userType, isActive) {
        switch (userType) {
            case 'Chairman':
                return new Chairman_1.default(name, email, password, id, createdAt);
            case 'Head':
                return new Head_1.default(name, email, password, id, createdAt);
            case 'Volunteer':
                return new Volunteer_1.default(name, email, password, id, createdAt);
            case 'Outsider':
                return new Outsider_1.default(name, email, password, id, createdAt);
            default:
                throw new Error('Invalid user type');
        }
    }
}
exports.default = UserFactory;
