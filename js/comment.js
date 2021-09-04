const form = document.querySelector(".commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const commentList = document.querySelector(".commentList");
const allDltBtn = commentList.querySelectorAll("button");

const handleDeleteComment = (e) => {
    const ul = e.target.parentNode.parentNode
    const li = e.target.parentNode
    const commentId = li.dataset.id;
    const videoId = form.dataset.id;
    ul.removeChild(li);
    fetch(`/video/${videoId}/commentDelete`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ commentId })
    })
}

allDltBtn.forEach(btn => {
    btn.addEventListener("click", handleDeleteComment);
})



const createComment = (text, id) => {
    const newComment = document.createElement("li");
    const span = document.createElement("span");
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "X";
    span.innerText = text;
    newComment.dataset.id = id;
    newComment.appendChild(span);
    newComment.appendChild(dltBtn);
    commentList.prepend(newComment);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const text = textarea.value;
    const videoId = form.dataset.id;
    const response = await fetch(`/video/${videoId}/comment`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text })
    })
    if (response.status === 201) {
        textarea.value = "";
        const { commentId } = await response.json();
        createComment(text, commentId);
    }
}

btn.disabled = true;

const handleTextarea = (e) => {
    if (textarea.value.trim().length === 0) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
}

textarea.addEventListener("input", handleTextarea);

form.addEventListener("submit", handleSubmit);