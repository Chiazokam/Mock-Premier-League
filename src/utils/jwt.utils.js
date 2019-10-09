import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

/* @description - Generates a JWT token
 * @param {object} data
 * @param {string} expires
 * @returns {string} token
 */
const generateToken = async (data, expires) => {
  const token = await jwt.sign(data, JWT_SECRET, { expiresIn: expires });
  return token;
};

/**
 * @description Verify user token
 * @param {string} token
 * @param {object} res
 * @returns {object} decoded
 */
const verifyToken = async (token, res) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(401).json({
      status: 401,
      message: 'Verification error',
    });
  }
  return decoded;
});

export { generateToken, verifyToken };
