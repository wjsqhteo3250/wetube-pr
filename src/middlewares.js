import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.user = req.session.user || {};
    next();
}

export const publicMiddleWare = (req, res, next) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    } else {
        return next();
    }
}

export const privateMiddleWare = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect("/");
    } else {
        return next();
    }
}

export const avatarUpload = multer({ dest: "uploads/avatar", limits: { fileSize: 10000000 } });
export const videoUpload = multer({ dest: "uploads/video", limits: { fileSize: 100000000 } });