import mongoose, {Schema, model, Document, Types} from 'mongoose';
import { compareValue, hashValue } from "../utils/bcrypt";

type Role = 'Outsider' | 'Volunteer' | 'Head' | 'Chairman';

export interface UserDocument extends mongoose.Document {
  _id: Types.ObjectId;
    email : string;
    phoneNo: string;
    warnings: number;
    name: string;
    role: Role;
    enrollDate: Date;
    leaveDate?: Date | null;
    state?: 'active' | 'left';
    password: string;
    department: string;
    roleHistory: {
        role: Role;
        dateAssigned: Date;
    }[];
    permissions: string;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {type: String, required: true, unique: true},
    phoneNo: {type: String, required: true, unique: true},
    warnings: {type: Number},
    name: {type: String, required: true},
    role: {
        type: String,
        enum: ['Outsider', 'Volunteer', 'Head', 'Chairman'],
        required: true
    },
    enrollDate: {type: Date, required: true, default: Date.now},
    leaveDate: {type: Date, default: null},
    password: {type: String, required: true},
    department: {type: String, required: true},
    roleHistory: [{
        role: {
            type: String,
            enum: ['Outsider', 'Volunteer', 'Head', 'Chairman'],
            required: true
        },
        dateAssigned: {type: Date, required: true}
    }],
    permissions: {type: String, required: true}
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

userSchema.virtual('state').get(function(this: UserDocument) {
    return this.leaveDate ? 'left' : 'active';
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;