import mongoose, {Schema, model, Document, Types} from 'mongoose';
import bcrypt from 'bcryptjs';
type Role = 'Outsider' | 'Volunteer' | 'Head' | 'Chairman';

export interface IUser extends Document {
    email : string;
    phoneNo: string;
    warnings: number;
    name: string;
    role: Role;
    enrollDate: Date;
    leaveDate?: Date | null;
    state?: 'active' | 'left';
    passwordHash: string;
    departmendId: Types.ObjectId;
    roleHistory: {
        role: Role;
        dateAssigned: Date;
    }[];
    permissionsId: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
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
    passwordHash: {type: String, required: true},
    departmendId: {type: Schema.Types.ObjectId, ref: 'Department', required: true},
    roleHistory: [{
        role: {
            type: String,
            enum: ['Outsider', 'Volunteer', 'Head', 'Chairman'],
            required: true
        },
        dateAssigned: {type: Date, required: true}
    }],
    permissionsId: {type: Schema.Types.ObjectId, ref: 'Permissions', required: true}
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

userSchema.virtual('state').get(function(this: IUser) {
    return this.leaveDate ? 'left' : 'active';
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

export const User = model<IUser>('User', userSchema);