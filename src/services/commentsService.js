import { where } from "sequelize";
import db from "../models";

// lấy comment
// export const getAllCommentsService = async ({ id }) => {
//     try {
//         const response = await db.announcement.findOne({
//             include: [
//                 {
//                     model: db.lecturer,
//                     as: 'author',
//                     attributes: ['name']
//                 },
//                 {
//                     model: db.comment,
//                     as: 'comments',
//                     order: [
//                         ['id', 'DESC']
//                     ], // Sắp xếp theo trường id giảm dần,
//                     include: [
//                         {
//                             model: db.student,
//                             as : 'commentbyuser',
//                             attributes : ['name']
//                         }
//                     ]
//                 }
//             ],
//             where: {
//                 id
//             }
//         });
//         return {
//             msg: response ? 'Thành công!' : 'Không thành công.',
//             data: response
//         };
//     } catch (error) {
//         throw (error);
//     }
// };

export const getAllCommentsService = async ({ id }) => {
    try {
        const announcement = await db.announcement.findOne({
            include: [
                {
                    model: db.lecturer,
                    as: 'author',
                    attributes: ['name']
                }
            ],
            where: {
                id
            }
        });

        const comments = await db.comment.findAll({
            where: {
                announcementid: id
            },
            include: [
                {
                    model: db.student,
                    as: 'commentbyuser',
                    attributes: ['name']
                }
            ]
        });

        return {
            msg: announcement ? 'Thành công!' : 'Không thành công.',
            data: [announcement, comments]
        };
    } catch (error) {
        throw (error);
    }
};



// tạo comment
export const createCommentService = async ({ announcementid, userid, content }) => {
    try {
        const response = await db.comment.create({
            announcementid,
            userid,
            content
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}


// xóa comment
export const deleteCommentService = async ({ id }) => {
    try {
        const response = await db.comment.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : 'Không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}