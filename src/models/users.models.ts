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
