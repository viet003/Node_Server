import db from "../models"

// tạo thông báo
export const createAnnouncementService = async ({ title, content, topicid, userid }) => {
    try {
        const response = await db.announcement.create({
            title,
            content,
            topicid,
            userid
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Tạo thành công!' : 'Tạo không thành công!'
        }
    } catch (error) {
        throw (error)
    }
}
// sửa
export const editAnnouncementService = async ({ id, title, content }) => {
    try {
        const response = await db.announcement.update({
            title,
            content,
        }, { where: { id } })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật thành công!' : 'Cập nhật không thành công!'
        }
    } catch (error) {
        throw (error)
    }
}
// lấy toàn bộ thông báo
export const getAllAnnouncementService = async ({ topicid }) => {
    try {
        const response = await db.announcement.findAll({
            include: [
                {
                    model: db.topic,
                    as: 'announcements',
                    attributes: [], 
                },
                {
                    model: db.lecturer,
                    as: 'author',
                    attributes: ['name']
                }
            ],
            where: {
                '$announcements.id$': topicid
            },
            order : [['id','DESC']]
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công!!',
            data: response
        }
    } catch (error) {
        throw (error)
    }
}

// lấy thông báo theo user
export const getAllAnnouncementServiceByUser = async ({ userid, type }) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const response = await db.group.findAll({
                    include: [
                        {
                            model: db.topic,
                            as: 'topics',
                            attributes: ['id'],
                            include: [
                                {
                                    model: db.announcement,
                                    as: 'announcements'
                                } // Sử dụng alias đã đặt tên là 'topics'
                            ],
                            order: [['id', 'DESC']],
                        },
                    ],
                    where: {
                        studentid: userid
                    }
                });

                return {
                    err: response ? 0 : 2,
                    msg: response ? 'Thành công!' : 'Không thành công!!',
                    data: response
                }
            } catch (error) {
                throw (error)
            }
            break;
        default:
            try {
                const response = await db.announcement.findAll({
                    include: [
                        {
                            model: db.topic,
                            as: 'announcements',
                            attributes: ['id', 'title'],
                        },
                    ],
                    where: {
                        userid
                    },
                    order: [['id', 'DESC']],
                });

                return {
                    err: response ? 0 : 2,
                    msg: response ? 'Thành công!' : 'Không thành công!!',
                    data: response
                }
            } catch (error) {
                throw (error)
            }
            break;
    }
}
//
export const deleteAnnouncementService = async ({ id }) => {
    try {
        const response = await db.announcement.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công!'
        }
    } catch (error) {
        throw (error)
    }
}