import User from '../models/user';
import { verifyToken } from '../utils/jwt.utils';
import roles from '../utils/roles.utils';

/* istanbul ignore next */
class AuthMiddlewares {
  static async doesUserExist(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          status: 409,
          message: 'User already exists',
        });
      }
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  /**
 * @description Check if user is signed in
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
  static async isUserSignedIn(req, res, next) {
    const { authorization } = req.headers;
    if (typeof authorization === 'undefined') {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Header not set',
      });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Please sign in again',
      });
    }

    try {
      const decoded = await verifyToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: 'Error in verification. Please try again',
      });
    }
  }

  static async grantAccess(action, resource) {
    return async (req, res, next) => {
      try {
        const { role } = req.user;
        const permission = roles.can(role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: 'You do not have enough permission to perform this action',
          });
        }
        return next();
      } catch (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
        });
      }
    };
  }
}

export default AuthMiddlewares;
