import * as commentService from "../services/commentsService"

//lay comment
export const getAllComments = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await commentService.getAllCommentsService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// tao comment
export const createComment = async (req, res) => {
    const { announcementid, userid, content } = req.body;
    try {
        if (!announcementid || !userid || !content) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await commentService.createCommentService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
