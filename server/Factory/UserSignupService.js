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
const mongodb_1 = require("mongodb");
const UserFactory_1 = __importDefault(require("./UserFactory"));
const _db_1 = require("@db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserSignupService {
    constructor() {
        this.userFactory = new UserFactory_1.default();
        this.db = (0, _db_1.getDb)();
        if (!this.db) {
            throw new Error('Database not connected. Call connectToDb() first.');
        }
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password, isActive } = userData;
            const userType = userData.role; // Assuming role is passed in userData
            const encryptedPassword = yield this.encryptPassword(password);
            let role;
            switch (userType) {
                case 'Chairman':
                    role = 'Chairman';
                    break;
                case 'head':
                    role = 'Head';
                    break;
                case 'volunteer':
                    role = 'Volunteer';
                    break;
                case 'outsider':
                    role = 'Outsider';
                    break;
                default:
                    return { success: false, error: 'Invalid user type' };
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation
            if (!emailRegex.test(email)) {
                return { success: false, error: 'Invalid email format' };
            }
            const existingUser = yield this.db.collection('users').findOne({ email });
            if (existingUser) {
                return { success: false, error: 'email already exist' };
            }
            const newUser = this.userFactory.createUser(name, email, encryptedPassword, new mongodb_1.ObjectId().toString(), // MongoDB will generate this automatically
            new Date(), // Set the createdAt field to the current date
            role, isActive //ex. pervious chairman 
            );
            try {
                const result = yield this.db.collection('users').insertOne(newUser);
                return {
                    success: true,
                    userId: result.insertedId.toString(),
                    email: newUser.getEmail(),
                    role: role, // Return the role of the created user
                };
            }
            catch (error) {
                console.error('Error creating user:', error);
                return { success: false, error: 'Failed to create user' };
            }
        });
    }
}
