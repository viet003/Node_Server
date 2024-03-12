import * as topicService from '../services/topicServices'

// tạo bài đăng
export const createTopic = async (req, res) => {
    const { id, title, quantity, description, schoolyear, userid } = req.body;

    try {
        if (!title || !quantity || !description || !userid || !id || !schoolyear) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await topicService.createTopicService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// edit topic
export const editTopic = async (req, res) => {
    const { id, title, quantity, description, schoolyear, userid } = req.body;

    try {
        if (!title || !quantity || !description || !userid || !id || !schoolyear) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await topicService.editTopicService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy Topic 
export const getTopic = async (req, res) => {
    const { userid, schoolyear, type } = req.body
    if (!schoolyear || !userid || !type) {
        return res.status(400).json({
            err: 1,
            msg: "Missing input data!"
        })
    }
    switch (type) {
        case 'Sinh viên':
            try {
                const rs = await topicService.getTopicServiceForSt(req.body)
                return res.status(200).json(rs)
            } catch (error) {
                console.log(error)
                return res.status(500).json(error)
            }
            break;
        default:
            try {
                const rs = await topicService.getTopicServiceForLr(req.body)
                return res.status(200).json(rs)
            } catch (error) {
                return res.status(500).json(error)
            }
            break;
    }
}
// xóa Topic
export const deleteTopic = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await topicService.deletePostService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// lấy thông tin topic
export const getTopicInfo = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await topicService.getTopicInforService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
