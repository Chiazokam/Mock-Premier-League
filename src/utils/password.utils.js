import bcrypt from 'bcrypt';

/**
 * @description - Hash password inputs
 * @param {string} password
 * @returns {string} hash
 */
const hashPassword = (password) => bcrypt.hash(password, 10);

/**
 * @description - Validate password inputs
 * @param {string} password
 * @param {string} hash
 * @returns {boolean} boolean
 */
const isPasswordValid = (password, hash) => bcrypt.compare(password, hash);

export { hashPassword, isPasswordValid };
