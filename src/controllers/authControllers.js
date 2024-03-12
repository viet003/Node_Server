import * as authService from "../services/authServices"
import * as userService from "../services/userServices"
import * as postService from "../services/postServices"


// đăng ký
export const register = async (req, res) => {
    const { id, email, password, type, userid } = req.body;

    try {
        switch (type) {
            case "Quản trị viên":
                if (!type || !email || !password || !id) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Invalid input data!"
                    })
                }
                const rs = await authService.registerService(req.body)
                return res.status(200).json(rs)
                break;

            default:
                if (!type || !email || !password || !userid) {
                    return res.status(400).json({
                        err: 1,
                        msg: "Missing input data!"
                    })
                }
                const rs1 = await authService.registerService(req.body)
                return res.status(200).json(rs1)
                break;
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/register"
        })
    }
}
// đăng nhập
export const login = async (req, res) => {
    const { email, password, type } = req.body;

    try {
        if (!type || !email || !password) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.loginService(req.body)
        return res.status(200).json(rs)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail at auth controller!/login"
        })
    }
}
// lấy lại mật khẩu
export const getPass = async (req, res) => {
    const { email, type } = req.body;

    try {
        if (!email || !type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.getPassService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// đổi mật khẩu
export const changePass = async (req, res) => {
    const { email, password, newpassword, type } = req.body;

    try {
        if (!email || !password || !newpassword || !type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.changePassService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// xóa tài khoản
export const deleteAccount = async (req, res) => {
    const { type, email } = req.body;
    try {
        if (!type || !email) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.deleteAccountService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}
// lấy toàn bộ tài khoản
export const getAccount = async (req, res) => {
    const { type } = req.body;
    try {
        if (!type) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input data!"
            })
        }
        const rs = await authService.getAccountService(req.body)
        return res.status(200).json(rs)
    } catch (error) {
        return res.status(500).json(error)
    }
}





















