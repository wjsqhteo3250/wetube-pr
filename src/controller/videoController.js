export const home = (req, res) => {
    return res.render("videos/home", { pageTitle: "wetube" });
}

export const createVideo = (req, res) => {
    return res.send("create video");
}

export const watchVideo = (req, res) => {
    return res.send("watch video");
}

export const updateVideo = (req, res) => {
    return res.send("update video");
}

export const deleteVideo = (req, res) => {
    return res.send("delete video");
}