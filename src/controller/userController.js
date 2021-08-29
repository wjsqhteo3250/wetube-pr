import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("users/join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { body: { name, email, password } } = req;
    const user = await User.create({
        name,
        email,
        password
    });
    return res.redirect("/login");
}

export const profile = async (req, res) => {
    const { params: { id } } = req;
    const user = await User.findById(id);
    return res.render("users/profile", { pageTitle: "profile", user });
}

export const getChangePassword = (req, res) => {
    res.render("users/changePassword", { pageTitle: "change password" })
}

export const postChangePassword = async (req, res) => {
    const { body: { oldPassword, newPassword, newPassword2 }, session: { user } } = req;
    const ok = await bcrypt.compare(oldPassword, user.password);
    console.log(ok);
    res.redirect("/")
}

export const getEditProfile = (req, res) => {
    return res.render("users/editProfile");
}

export const postEditProfile = async (req, res) => {
    const { body: { name, email }, params: { id }, session: { user } } = req;
    const nameExist = await User.exists({ name })
    const emailExist = await User.exists({ email })
    if (nameExist && user.name !== name) {
        return res.status(403).render("users/editProfile", { errorMessage: "name already exist" })
    }
    if (emailExist && user.email !== email) {
        return res.status(403).render("users/editProfile", { errorMessage: "email already exist" })
    }
    const changeedUser = await User.findByIdAndUpdate(id, {
        name, email
    });
    req.session.user = changeedUser;
    return res.redirect(`/user/${id}`);
}

export const deleteUser = (req, res) => {
    return res.send("delete user");
}

export const getLogin = (req, res) => {
    return res.render("users/login");
}

export const postLogin = async (req, res) => {
    const { body: { name, password } } = req;
    const emailRegex = new RegExp("@");
    let currentUser;
    if (emailRegex.test(name)) {
        currentUser = await User.findOne({ email: name });
    } else {
        currentUser = await User.findOne({ name });
    }
    if (!currentUser) {
        return res.status(403).render("users/login", { errorMessage: "can`t not find user" })
    } else {
        const ok = await bcrypt.compare(password, currentUser.password);
        if (!ok) {
            return res.status(403).render("users/login", { errorMessage: "wrong password" })
        } else {
            req.session.loggedIn = true;
            req.session.user = currentUser;
            return res.redirect("/");
        }
    }
}

export const logout = (req, res) => {
    return res.send("logout");
}