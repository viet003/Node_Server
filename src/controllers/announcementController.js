import * as announcementService from "../services/announcementsService"

export const createAnnouncement = async (req, res) => {
    const { title, content, topicid, userid } = req.body;
    try {
        if (!title || !content || !topicid || !userid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await announcementService.createAnnouncementService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const editAnnouncement = async (req, res) => {
    const { id, title, content } = req.body;
    try {
        if (!title || !content || !id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await announcementService.editAnnouncementService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllAnnouncement = async (req, res) => {
    const { topicid, userid, type } = req.body;
    try {
        if (!topicid && !userid && !type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = topicid ? await announcementService.getAllAnnouncementService(req.body) : await announcementService.getAllAnnouncementServiceByUser(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

//
export const deleteAnnouncement = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await announcementService.deleteAnnouncementService(req.body) 
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
