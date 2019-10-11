/* eslint-disable no-underscore-dangle */
import User from '../models/user';
import { hashPassword, isPasswordValid } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';

class AuthControllers {
  /**
 * @description User signup controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async signup(req, res) {
    const {
      email, password, role,
    } = req.body;

    const hash = await hashPassword(password);
    const newUser = new User({
      email,
      password: hash,
      role,
    });
    const token = await generateToken({
      id: newUser._id,
      role: newUser.role,
    }, '30d');
    await newUser.save();
    return res.status(201).json({
      status: 201,
      message: 'Successfully signed up',
      data: newUser,
      token,
    });
  }

  /**
 * @description User signin controller
 * @param {object} req
 * @param {object} res
 * @returns {object} res
 */
  static async signin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'Incorrect Credentials',
      });
    }
    const validPassword = await isPasswordValid(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: 401,
        message: 'Incorrect Credentials',
      });
    }
    const token = await generateToken({
      id: user._id,
      role: user.role,
    }, '30d');
    return res.status(200).json({
      status: 200,
      message: 'Successfully signed in',
      data: user,
      token,
    });
  }
}

export default AuthControllers;
