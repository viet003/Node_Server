import db from "../models"

//get
export const getAllUserService = ({ type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const response = await db.student.findAll();
                resolve({
                    err: response?.length === 0 ? 2 : 0,
                    msg: 'Sinh viên',
                    data: response
                })
            } catch (error) {
                reject(error)
            }
            break;
        default:
            const response = await db.lecturer.findAll();
            resolve({
                err: response?.length === 0 ? 2 : 0,
                msg: 'Giảng viên',
                data: response
            })
            break;
    }
})
//get
export const getUserService = ({ type, id }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const response = await db.student.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            model: db.svAccount,
                            as : 'studentAccount',
                            attributes:['email']
                        }
                    ]
                });
                resolve({
                    err: response?.length === 0 ? 2 : 0,
                    msg: 'Sinh viên',
                    data: response
                })
            } catch (error) {
                reject(error)
            }
            break;
        default:
            const response = await db.lecturer.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: db.gvAccount,
                        as : 'lecturerAccount',
                        attributes:['email']
                    }
                ]
            });
            resolve({
                err: response?.length === 0 ? 2 : 0,
                msg: 'Giảng viên',
                data: response
            })
            break;
    }
})
// post
export const createUserService = ({ id, name, dob, clas, major, department, type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case "Sinh viên":
            try {
                const checkST = await db.student.findOne({ where: { id } })
                if (checkST) {
                    resolve({
                        err: 2,
                        msg: "UserID đã được sử dụng."
                    })
                } else {
                    const response = await db.student.create({
                        id,
                        name,
                        dob,
                        class: clas,
                        major,
                        department: department,
                        isActive: 1
                    })
                    resolve({
                        err: response ? 0 : 2,
                        msg: response ? 'Thêm mới sinh viên thành công!' : 'Thêm mới không thành công.'
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const checkLT = await db.lecturer.findOne({ where: { id } });
                if (checkLT) {
                    resolve({
                        err: 2,
                        msg: "UserID đã được sử dụng"
                    })
                } else {
                    const response = await db.lecturer.create({
                        id,
                        name,
                        dob,
                        major,
                        department,
                        isActive: 1
                    })
                    resolve({
                        err: response ? 0 : 2,
                        msg: response ? 'Thêm mới giảng viên thành công!' : 'Thêm mới không thành công.'
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
    }
});
// put
export const updateUserService = ({ id, name, dob, clas, major, department, isActive, type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const checkST = await db.student.findOne({ where: { id } })
                if (checkST) {
                    const response = await db.student.update({
                        name,
                        dob,
                        class: clas,
                        major,
                        department,
                        isActive
                    }, {
                        where: {
                            id
                        }
                    })
                    resolve({
                        err: response ? 0 : 2,
                        msg: response ? 'Update thành công!' : ' Update không thành công.'
                    })
                } else {
                    resolve({
                        err: 2,
                        msg: 'Sinh viên không tồn tại.'
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;

        default:
            try {
                const checkLT = await db.lecturer.findOne({ where: { id } });
                if (checkLT) {
                    const response = await db.lecturer.update({
                        name,
                        dob,
                        major,
                        department,
                        isActive
                    }, {
                        where: {
                            id
                        }
                    })
                    resolve({
                        err: response ? 0 : 2,
                        msg: response ? 'Updtae thành công!' : ' Update không thành công.'
                    })
                } else {
                    resolve({
                        err: 2,
                        msg: 'Giảng viên không tồn tại!'
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
    }
})
// delete
export const deleteUserService = ({ id, type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const response = await db.student.destroy({
                    where: {
                        id
                    },
                });

                resolve({
                    err: response ? 0 : 2,
                    msg: response ? 'Xóa thành công!' : "Xóa không thành công! Kiểm tra lại thông tin userID!"
                })
                break;
            } catch (error) {
                reject(error)
            }
        default:
            try {
                const response = await db.lecturer.destroy({
                    where: {
                        id
                    }
                });

                resolve({
                    err: response ? 0 : 2,
                    msg: response ? 'Xóa thành công!' : "Xóa không thành công!"
                })
                break;
            } catch (error) {
                reject(error)
            }
            break;
    }
})