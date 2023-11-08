import isEmail from 'validator/lib/isEmail';

export const firstnameValidator = (value: string) => {
    if (!value) {
        return 'Firstname is required';
    }
    if (value.length < 2) {
        return 'Firstname must be at least 2 characters long';
    }
    if (value.length > 30) {
        return 'Firstname must be less than 30 characters long';
    }
    return null;
};

export const lastnameValidator = (value: string) => {
    if (!value) {
        return 'Lastname is required';
    }
    if (value.length < 2) {
        return 'Lastname must be at least 2 characters long';
    }
    if (value.length > 30) {
        return 'Lastname must be less than 30 characters long';
    }
    return null;
};

export const usernameValidator = (value: string) => {
    if (!value) {
        return 'Username is required';
    }
    if (value.length < 2) {
        return 'Username must be at least 2 characters long';
    }
    if (value.length > 30) {
        return 'Username must be less than 30 characters long';
    }
    return null;
};

export const emailValidator = (value: string) => {
    if (!value) {
        return 'Email is required';
    }
    if (!isEmail(value)) {
        return 'Email is invalid';
    }
    return null;
};

export const dateOfBirthValidator = (value: string) => {
    if (!value) {
        return 'Date of birth is required';
    }
    return null;
};

export const passwordValidator = (value: string) => {
    if (!value) {
        return 'Password is required';
    }
    // if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
    //     return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long';
    // }
    return null;
};

export const languageValidator = (value: string) => {
    if (!value) {
        return 'Language is required';
    }
    return null;
}

export const profilePictureValidator = (value: string) => {
    if (!value) {
        return 'Profile picture is required';
    }
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value)) {
        return 'Profile picture must be a valid image';
    }
    return null;
}