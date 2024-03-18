import * as groupService from "../services/groupServices"

// đăng ký tham gia vào group
export const addToGroup = async (req, res) => {
    const { name, studentid, topicid } = req.body;
    try {
        if (!name || !studentid || !topicid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await groupService.addToGroupService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// đồng ý yêu cầu tham gia group
export const acceptToGroup = async (req, res) => {
    const { studentid, topicid } = req.body;
    try {
        if (!studentid || !topicid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await groupService.acceptToGroupService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// từ chối yêu cầu
export const removeFromGroup = async (req, res) => {
    const { studentid, topicid } = req.body;
    try {
        if (!studentid || !topicid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await groupService.removeFromGroupService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy thông tin lớp
export const getGroup = async (req, res) => {
    const { studentid , schoolyear} = req.body;
    try {
        if (!studentid || !schoolyear) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await groupService.getGroupService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy thông thông tin sinh viên
export const getStudent = async (req, res) => {
    const { topicid } = req.body;
    try {
        if (!topicid) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await groupService.getStudentService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}