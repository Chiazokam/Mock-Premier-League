import User from '../models/user';

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
}

export default AuthMiddlewares;
