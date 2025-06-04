// src/utils/regex/index.ts

export const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'-]+$/;

export const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    specialChar: /[!@#$%^&*(),.?":{}|<>_]/,
};
