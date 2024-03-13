import * as userService from "../services/userServices"

// tạo user
export const createUser = async (req, res) => {
    const { id, name, dob, clas, major, department, type } = req.body;

    try {
        switch (type) {
            case 'Sinh viên':
                if (!id || !name || !dob || !clas || !major || !department || !type) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs = await userService.createUserService(req.body)
                return res.status(200).json(rs)
                break;
            default:
                if (!id || !name || !dob || !major || !department || !type) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs1 = await userService.createUserService(req.body)
                return res.status(200).json(rs1)
                break;
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy sinh thông tin user
export const getUser = async (req, res) => {
    const { type, id } = req.body;
    try {
        if (!type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = id ? await userService.getUserService(req.body) : await userService.getAllUserService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// xóa thông tin user
export const deleteUser = async (req, res) => {
    const { id, type } = req.body;
    try {
        if (!id || !type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await userService.deleteUserService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// update thông tin user
export const updateUser = async (req, res) => {
    const { id, name, dob, clas, major, department, isActive, type } = req.body;

    try {
        switch (type) {
            case 'Sinh viên':
                if (!id || !name || !dob || !clas || !major || !department || !type || (isActive != 0 && isActive != 1)) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }

                const rs = await userService.updateUserService(req.body)
                return res.status(200).json(rs)
                break;
            default:
                if (!id || !name || !dob || !major || !department || !type || (isActive != 0 && isActive != 1)) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs1 = await userService.updateUserService(req.body)
                return res.status(200).json(rs1)
                break;
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}