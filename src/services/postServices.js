import db from "../models"

// tạo post
export const createPostService = ({ title, link, description, userid }) => new Promise(async (resolve, reject) => {
    try {
        const adAccount = await db.adAccount.findOne({ where: { id: userid } });

        if (!adAccount) {
            resolve({
                err: 2,
                msg: 'Tạo không thành công. UserID không tồn tại.'
            });
        } else {
            const response = await db.post.create({
                title,
                link,
                description,
                userid
            });

            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Tạo thành công!' : 'Tạo không thành công. Đã xảy ra lỗi.'
            });
        }
    } catch (error) {
        reject(error);
    }
});
// xóa post
export const deletePostService = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.post.destroy({
            where: {
                id
            },
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Xóa thành công!' : "Xóa không thành công. Kiểm tra lại ID."
        })
    } catch (error) {
        reject(error)
    }
})
// lấy post
export const getPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.post.findAll({
            order: [['id', 'DESC']],
        });
        resolve({
            err: response.length === 0 ? 2 : 0,
            msg: 'Post',
            data: response
        })
    } catch (error) {
        reject(error)
    }
}) 