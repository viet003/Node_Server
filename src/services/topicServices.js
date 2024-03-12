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
        const checkDK = await db.group.findOne({ where: { studentid: userid } });
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
                // Sử dụng Promise.all để đợi tất cả các promise được trả về từ mảng db.group.findAll
                const newresponse = await Promise.all(response.map(async (e) => {
                    const rs = await db.group.findAll({
                        where: { topicid: e.id }
                    });
                    // Tiếp tục xử lý kết quả ở đây
                    return { ...e.toJSON(), currentQuantity: rs.length };
                }));

                resolve({
                    err: 0,
                    msg: 'Có thể đăng ký!',
                    data: newresponse
                });
            } else {
                // Xử lý trường hợp không có response hoặc response không có phần tử
                resolve({
                    err: 2,
                    msg: 'Không có dữ liệu',
                    data: []
                });
            }
        } else {
            // Xử lý trường hợp đã kiểm tra
            resolve({
                msg: 'Đã kiểm tra',
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
                    as: 'lecturerTopic', // Sử dụng alias đã đặt tên là 'studentAccount'
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
            // Nếu id không tồn tại
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
                    as: 'lecturerTopic', // Sử dụng alias đã đặt tên là 'studentAccount'
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