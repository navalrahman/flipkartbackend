import jwt from 'jsonwebtoken';

const createToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // `secure` should be true in production
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
};

export default createToken;
