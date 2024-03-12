import * as postService from "../services/postServices"

// tạo bài đăng
export const createPost = async (req, res) => {
    const { title, link, description, userid } = req.body;

    try {
        if (!title || !link || !description || !userid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await postService.createPostService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy post
export const getPost = async (req, res) => {
    try {
        const rs = await postService.getPostService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// xóa post
export const deletePost = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await postService.deletePostService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
