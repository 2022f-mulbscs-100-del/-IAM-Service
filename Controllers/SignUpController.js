export const SignUpController = (req, res, next) => {
    try {
        res.status(200).json({ message: 'SignUp endpoint is working' });
    } catch (error) {
        next(error);
    }
};