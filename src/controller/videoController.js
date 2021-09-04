import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("videos/home", { pageTitle: "wetube", videos });
}

export const getUploadVideo = (req, res) => {
    return res.render("videos/upload", { pageTitle: "Upload Video" });
}

export const postUploadVideo = async (req, res) => {
    const { body: { title, description }, file: { path: fileUrl }, session: { user: { _id } } } = req;
    const video = await Video.create({
        title,
        fileUrl,
        description,
        owner: _id
    });
    const user = await User.findById(_id);
    user.videos.push(video._id);
    await user.save();
    return res.redirect("/")
}

export const watchVideo = async (req, res) => {
    const { params: { id } } = req;
    const video = await Video.findById(id).populate("owner").populate("comments");
    return res.render("videos/watch", { video });
}

export const getUpdateVideo = async (req, res) => {
    const { params: { id }, session: { user: { _id } } } = req;
    const video = await Video.findById(id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("videos/update", { video });
}

export const postUpdateVideo = async (req, res) => {
    const { body: { title, description }, params: { id }, session: { suer: { _id } } } = req;
    const video = await Video.findById(id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title, description
    });
    return res.redirect(`/video/${id}`);
}

export const deleteVideo = async (req, res) => {
    const { params: { id }, session: { user: { _id } } } = req;
    const video = await Video.findById(id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const commentApi = async (req, res) => {
    const { params: { id }, session: { user: { _id } }, body: { text } } = req;
    const newComment = await Comment.create({
        video: id,
        owner: _id,
        text
    })
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatuc(404);
    }
    video.comments.push(newComment._id);
    await video.save();
    const user = await User.findById(_id);
    if (!user) {
        return res.sendStatuc(404);
    }
    user.comments.push(newComment._id);
    await user.save();
    return res.status(201).json({ commentId: newComment._id });
}

export const commentDelete = async (req, res) => {
    const { params: { id }, session: { user: { _id } }, body: { commentId } } = req;
    const comment = await Comment.findById(commentId);
    if (String(comment.owner) === _id) {
        await Comment.deleteOne({ _id: commentId });
    } else {
        return res.sendStatus(400)
    }
    const user = await User.findById(_id);
    const userIndex = user.comments.indexOf(commentId);
    user.comments.splice(userIndex, 1);
    await user.save();
    const video = await Video.findById(id);
    const VideoIndex = video.comments.indexOf(commentId);
    video.comments.splice(VideoIndex, 1);
    await video.save();
    return res.sendStatus(200);
}