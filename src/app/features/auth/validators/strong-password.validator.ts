import { AbstractControl, ValidationErrors } from '@angular/forms';

export const strongPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const minLength = 8;
  const isValid =
    hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && value.length >= minLength;
  console.log('Password validity:', !isValid);
  return !isValid ? { weakPassword: true } : null;
};
