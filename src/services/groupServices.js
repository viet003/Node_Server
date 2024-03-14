import db from '../models'

// đăng ký vào lớp học
export const addToGroupService = async ({ name, studentid, topicid }) => {
    try {
        const checkInGroup = await db.group.findOne({ where: { studentid, topicid } });
        if (!checkInGroup) {
            // Nếu id không tồn tại
            const response = await db.group.create({
                name,
                studentid,
                topicid,
            });

            return {
                err: response ? 0 : 2,
                msg: response ? 'Đăng ký thành công! Vui lòng chờ đợi giảng viên chấp nhận.' : 'Đăng ký không thành công! Đã xảy ra lỗi.'
            };
        } else {
            return {
                err: 2,
                msg: 'Tạo không thành công! Sinh viên đã có trong lớp...'
            };
        }
    } catch (error) {
        throw error;
    }
};

// accept
export const acceptToGroupService = async ({ studentid, topicid }) => {
    try {
        const checkInGroup = await db.group.findOne({ where: { studentid, topicid } });
        if (checkInGroup) {
            // Nếu id không tồn tại
            const response = await db.group.update({
                isadded: 1
            }, {
                where: { topicid, studentid }
            });

            return {
                err: response ? 0 : 2,
                msg: response ? 'Thành công' : 'Không thành công! Đã xảy ra lỗi!'
            };
        } else {
            return {
                err: 2,
                msg: 'Không thành công! Sinh viên không có trong lớp học..'
            };
        }
    } catch (error) {
        throw error;
    }
};

// deny
export const removeFromGroupService = async ({ studentid, topicid }) => {
    try {
        const checkInGroup = await db.group.findOne({ where: { studentid, topicid } });
        if (checkInGroup) {
            // Nếu id không tồn tại
            const response = await db.group.destroy({
                where: { studentid, topicid }
            });

            return {
                err: response ? 0 : 2,
                msg: response ? 'Thao tác thành công!' : 'Thao tác không thành công...'
            };
        } else {
            return {
                err: 2,
                msg: 'Sinh viên không có trong lớp....'
            };
        }
    } catch (error) {
        throw error;
    }
};
// get
export const getGroupService = async ({ studentid, schoolyear }) => {
    try {
        const response = await db.group.findAll({
            include: [
                {
                    model: db.topic,
                    as: 'topics' // Sử dụng alias đã đặt tên là 'topics'
                }
            ],
            where: {
                '$topics.schoolyear$': schoolyear,
                studentid // Áp dụng điều kiện trên cột 'schoolyear' của bảng 'topics'
            }
        });
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công!',
            data: response
        };

    } catch (error) {
        throw error;
    }
};
// lấy thông tin lớp
export const getStudentService = async ({ topicid }) => {
    try {
        const rs = await db.topic.findOne({
            where: { id: topicid },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.lecturer,
                    as: 'lecturerTopic', 
                    attributes: ['name']
                }
            ]
        });
        
        const response = await db.group.findAll({
            include: [
                // {
                //     model: db.topic,
                //     as: 'topics',
                //     attributes: ['description'] 
                // },
                {
                    model: db.student,
                    as: 'students',
                    attributes: ['name']
                }
            ],
            where: {
                topicid
            }
        });
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công!',
            data: response,
            info: rs
        };

    } catch (error) {
        throw error;
    }
};
