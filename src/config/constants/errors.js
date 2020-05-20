const errors = {
  VALUE_REQUIRED: 'Value is required',

  EMAIL_VALID: 'E-mail must be valid',
  EMAIL_ALREADY_EXISTS: 'E-mail already exists',

  USER_UNAUTHORIZED: 'User unauthorized',
  USER_NOT_EXISTS: 'User doesnt exist',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_INVALID: 'Invalid e-mail or password',

  PASSWORD_LENGTH: 'Password must be at least {{min}} chars and less than {{max}} chars',

  PHONE_VALID: 'Phone must be valid',

  TOKEN_REQUIRED: 'Token not provided',

  CONTACT_NOT_EXISTS: 'Contact doesnt exist',

  BILLING_NOT_EXISTS: 'Billing doesnt exist',
};

module.exports = errors;
