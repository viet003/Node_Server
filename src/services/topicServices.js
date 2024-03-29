import db from '../models'

// tạo topic
export const createTopicService = async ({ id, title, quantity, description, schoolyear, userid }) => {
    try {
        const checkTopic = await db.topic.findOne({ where: { id: id } });
        if (!checkTopic) {
            // Nếu id không tồn tại
            const response = await db.topic.create({
                id,
                title,
                quantity,
                description,
                schoolyear,
                lecturerid: userid
            });

            return {
                err: response ? 0 : 2,
                msg: response ? 'Tạo thành công!' : 'Tạo không thành công! Đã xảy ra lỗi!'
            };
        } else {
            return {
                err: 2,
                msg: 'Tạo không thành công! ID đã tồn tại!'
            };
        }
    } catch (error) {
        throw error;
    }
};

// lấy topic student
export const getTopicServiceForSt = ({ userid, schoolyear }) => new Promise(async (resolve, reject) => {
    try {
        const checkDK = await db.group.findOne({
            include: [
                {
                    model: db.topic,
                    as: 'topics',
                    attributes: ['schoolyear']
                }
            ],
            where: { studentid: userid, '$topics.schoolyear$': schoolyear },
        });
        // console.log(checkDK)
        if (!checkDK) {
            const response = await db.topic.findAll({
                where: { schoolyear },
                include: [
                    {
                        model: db.lecturer,
                        as: 'lecturerTopic',
                        attributes: ['name']
                    }
                ],
            });

            if (response && Array.isArray(response) && response.length > 0) {
                const newresponse = await Promise.all(response.map(async (e) => {
                    const rs = await db.group.findAll({
                        where: { topicid: e.id }
                    });
                    return { ...e.toJSON(), currentQuantity: rs.length };
                }));

                resolve({
                    err: 0,
                    msg: 'Có thể đăng ký!',
                    data: newresponse
                });
            } else {
                resolve({
                    err: 2,
                    msg: 'Không có dữ liệu',
                    data: []
                });
            }
        } else {
            resolve({
                msg: 'Sinh viên đã có nhóm',
                data: []
            });
        }
    } catch (error) {
        reject(error);
    }
});
// lấy topic cho lr
export const getTopicServiceForLr = ({ userid, schoolyear }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.topic.findAll({
            where: { lecturerid: userid, schoolyear },
            include: [
                {
                    model: db.lecturer,
                    as: 'lecturerTopic',
                    attributes: ['name']
                }
            ],
        });
        resolve({
            err: response.length === 0 ? 2 : 0,
            msg: 'Topic',
            data: response
        })
    } catch (error) {
        reject(error)
    }
})
// xóa topic
export const deletePostService = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.topic.destroy({
            where: {
                id
            },
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Xóa thành công!' : "Xóa không thành công! Kiểm tra lại ID!"
        })
    } catch (error) {
        reject(error)
    }
})
// edit topic
export const editTopicService = async ({ id, title, quantity, description, schoolyear, userid }) => {
    try {
        const checkTopic = await db.topic.findOne({ where: { id: id } });
        if (checkTopic) {
            const response = await db.topic.update({
                title,
                quantity,
                description,
                schoolyear,
                lecturerid: userid
            }, { where: { id } });

            return {
                err: response ? 0 : 2,
                msg: response ? 'Cập nhật thành công!' : 'Cập nhật không thành công! Đã xảy ra lỗi!'
            };
        } else {
            return {
                err: 2,
                msg: 'Cập nhật không thành công! ID không tồn tại!'
            };
        }
    } catch (error) {
        throw error;
    }
};
// lấy thông tin topic
export const getTopicInforService = async ({ id }) => {
    try {
        const response = await db.topic.findOne({
            where: { id },
            include: [
                {
                    model: db.lecturer,
                    as: 'lecturerTopic',
                    attributes: ['name']
                }
            ],
        });
        return ({
            err: response.length === 0 ? 2 : 0,
            msg: 'Topic Infor',
            data: response
        })
    } catch (error) {
        throw (error)
    }
}