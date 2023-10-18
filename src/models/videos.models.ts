interface User extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    username: string;
    password: string;
    createdAt: Date;
    status: boolean;
    language: string;
    profileImage: string;
}
const userSchema = new Schema<User>({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
    language: { type: String, required: true },
    profileImage: { type: String, required: true }
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;