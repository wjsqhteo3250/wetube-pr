import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
    return res.render("users/join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { body: { name, email, password, password2 } } = req;
    if (password !== password2) {
        return res.status(400).render("users/join", { errorMessage: "password does not match" });
    }
    const exist = await User.exists({ $or: [{ name }, { email }] });
    if (exist) {
        return res.status(400).render("users/join", { errorMessage: "user already exists" });
    }
    const user = await User.create({
        name,
        email,
        password
    });
    return res.redirect("/login");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.CLIENT_ID,
        scope: "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const githubRedirect = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenData = await (await fetch(finalUrl, {
        method: "post",
        headers: {
            Accept: "application/json",
        },
    })).json();
    if ("access_token" in tokenData) {
        const { access_token } = tokenData;
        const apiUrl = "https://api.github.com/";
        const userData = await (await fetch(`${apiUrl}user`, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailData = await (await fetch(`${apiUrl}user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailObj = emailData.find(email => email.primary === true && email.verified === true)
        if (!emailObj) {
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await await User.create({
                name: userData.name ? userData.name : emailObj.email.split("@")[0],
                email: emailObj.email,
                avatarUrl: userData.avatar_url,
                password: "",
                socialOnly: true,
            });;
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
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
    req.session.destroy();
    return res.redirect("/");
}