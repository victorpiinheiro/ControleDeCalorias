import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  try {
    const [, token] = authorization.split(' ');

    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token invalido ou expirados'],
    });
  }
};
