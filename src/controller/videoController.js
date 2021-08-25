import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("videos/home", { pageTitle: "wetube", videos });
}

export const getUploadVideo = (req, res) => {
    return res.render("videos/upload", { pageTitle: "Upload Video" });
}

export const postUploadVideo = async (req, res) => {
    const { body: { title, description } } = req;
    const video = await Video.create({
        title,
        description
    });
    return res.redirect("/")
}

export const watchVideo = async (req, res) => {
    const { params: { id } } = req;
    const video = await Video.findById(id);
    return res.render("videos/watch", { video });
}

export const getUpdateVideo = async (req, res) => {
    const { params: { id } } = req;
    const video = await Video.findById(id);
    return res.render("videos/update", { video });
}

export const postUpdateVideo = async (req, res) => {
    const { body: { title, description }, params: { id } } = req;
    const video = await Video.findByIdAndUpdate(id, {
        title, description
    });
    return res.redirect(`/video/${id}`);
}

export const deleteVideo = async (req, res) => {
    const { params: { id } } = req;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}