import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config();
const nodemailer = require('nodemailer');
// tạo mật khẩu ngẫu nhiên
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// đăng ký
const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const registerService = ({ id, email, password, type, userid }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case "Quản trị viên":
            try {
                const response = await db.adAccount.findOrCreate({
                    where: { email },
                    defaults: {
                        id: id,
                        email: email,
                        password: hash(password),
                        isactive: 1
                    }
                });
                const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '1d' });
                resolve({
                    err: token ? 0 : 2,
                    msg: token ? 'Successful account registration!' : 'Account is already in use!',
                    //token: token || null
                });
            } catch (error) {
                reject(error)
            }
            break;
        case "Sinh viên":
            try {
                const checkST = await db.student.findOne({ where: { id: userid } })
                if (checkST) {
                    const response = await db.svAccount.findOrCreate({
                        where: { email },
                        defaults: {
                            email: email,
                            password: hash(password),
                            userid: userid
                        }
                    });
                    const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '1d' });
                    resolve({
                        err: token ? 0 : 2,
                        msg: token ? 'Successful account registration!' : 'Account is already in use!',
                    });
                } else {
                    resolve({
                        err: 2,
                        msg: "UserID không tồn tại!"
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const checkLT = await db.lecturer.findOne({ where: { id: userid } });
                if (checkLT) {
                    const response = await db.gvAccount.findOrCreate({
                        where: { email },
                        defaults: {
                            email: email,
                            password: hash(password),
                            userid: userid
                        }
                    });
                    const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '1d' });
                    resolve({
                        err: token ? 0 : 2,
                        msg: token ? 'Successful account registration!' : 'Account is already in use!',
                    });
                } else {
                    resolve({
                        err: 2,
                        msg: "UserID không tồn tại!"
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
    }
});

// đăng nhập
export const loginService = ({ email, password, type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case "Quản trị viên":
            try {
                const response = await db.adAccount.findOne({
                    where: { email },
                    raw: true,
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                const token = isCorrectPass && jwt.sign({ id: response.id, email: response.email, type: type }, process.env.SECRET_KEY, { expiresIn: '1d' });
                resolve({
                    err: token ? 0 : 2,
                    msg: token ? 'Successful login!' : response ? 'Pass is wrong!!' : "Email is not found!",
                    token: token || null,
                });
            } catch (error) {
                reject(error)
            }
            break;
        case "Sinh viên":
            try {
                const response = await db.svAccount.findOne({
                    where: { email },
                    raw: true,
                    include: [
                        {
                            model: db.student,
                            as: 'studentAccount', // Sử dụng alias đã đặt tên là 'studentAccount'
                            attributes: ['name']
                        }
                    ],
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                const token = isCorrectPass && jwt.sign({ id: response.userid, email: response.email, type: type, name: response['studentAccount.name'] }, process.env.SECRET_KEY, { expiresIn: '1d' });
                resolve({
                    err: token ? 0 : 2,
                    msg: token ? 'Successful login!' : response ? 'Pass is wrong!!' : "Email is not found!",
                    token: token || null,
                    //data: response
                });
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const response = await db.gvAccount.findOne({
                    where: { email },
                    raw: true,
                    include: [
                        {
                            model: db.lecturer,
                            as: "lecturerAccount",
                            attributes: ['name']
                        }
                    ],
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                const token = isCorrectPass && jwt.sign({ id: response.userid, email: response.email, type: type, name: response["lecturerAccount.name"] }, process.env.SECRET_KEY, { expiresIn: '1d' });
                resolve({
                    err: token ? 0 : 2,
                    msg: token ? 'Successful login!' : response ? 'Pass is wrong!!' : "Email is not found!",
                    token: token || null,
                    //data: response
                });
            } catch (error) {
                reject(error)
            }
            break;
    }
});

// Lấy lại mật khẩu
export const getPassService = ({ email, type }) => new Promise(async (resolve, reject) => {
    const newPass = generateRandomPassword(8)
    switch (type) {
        case "Quản trị viên":
            try {
                const response = await db.adAccount.findOne({
                    where: { email },
                    raw: true
                });
                if (response) {
                    try {
                        await db.adAccount.update({ password: hash(newPass) }, {
                            where: {
                                email,
                            },
                        });
                        // Tạo một transporter bằng cách cung cấp thông tin về máy chủ email
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com', // Host của Gmail
                            port: 465, // Cổng SMTP của Gmail
                            secure: true,
                            auth: {
                                user: process.env.MAILER_EMAIL,
                                pass: process.env.PASS_EMAIL
                            }
                        });
                        // Định nghĩa các thông tin cần thiết cho email
                        let mailOptions = {
                            from: process.env.MAILER_EMAIL,
                            to: response.email,
                            subject: 'Lấy lại mật khẩu',
                            html: `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Email Template</title>
                                    <style>
                                        /* CSS styles go here */
                                        body {
                                            font-family: Arial, sans-serif;
                                            background-color: #f4f4f4;
                                            margin: 0;
                                            padding: 0;
                                        }
                                        .container {
                                            width: 100%;
                                            max-width: 600px;
                                            margin: 0 auto;
                                            padding: 20px;
                                            background-color: #ffffff;
                                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            border-radius: 10px;
                                            box-sizing: border-box;
                                        }
                                        h1 {
                                            color: #333333;
                                        }
                                        p {
                                            color: #666666;
                                        }
                                        .button {
                                            display: inline-block;
                                            padding: 10px 20px;
                                            background-color: #007bff;
                                            color: #ffffff;
                                            text-decoration: none;
                                            border-radius: 5px;
                                        }
                                        .bottom-bar {
                                            margin-top: 20px;
                                            padding-top: 20px;
                                            border-top: 1px solid #dddddd;
                                            text-align: center;
                                        }
                                        .pass {
                                            display: flex;
                                            justify-content: center; 
                                            align-items: center;
                                            font-size: 16px;
                                        }
                                        
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1>Lấy lại mật khẩu</h1>
                                        <p>Mật khẩu của bạn đã được thay đổi. Dưới đây là mật khẩu mới của bạn:</p>
                                        <p class="pass"><strong>${newPass}</strong></p>
                                        <a href="#" class="button">Đăng nhập</a>
                                        <div class="bottom-bar">
                                            <p>Nếu có bất kỳ câu hỏi hoặc thắc mắc, vui lòng liên hệ với chúng tôi:</p>
                                            <p>Email: devtester0321@gmail.com</p>
                                            <p>Điện thoại: 0987654321</p>
                                        </div>
                                    </div>
                                </body>
                                </html>
                            `
                        };

                        // Gửi email và xử lý kết quả
                        transporter.sendMail(mailOptions, (error, info) => {
                            resolve({
                                err: error ? 2 : 0,
                                msg: error ? `Email can't send to ${email}` : `Mật khẩu mới đã được gửi đến ${email}. Vui lòng kiểm tra email của bạn.`
                            })
                        });
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }

                } else {
                    resolve({
                        err: 2,
                        msg: "Email không tồn tại! Vui lòng kiểm tra lại thông tin",
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
        case "Sinh viên":
            try {
                const response = await db.svAccount.findOne({
                    where: { email },
                    raw: true
                });
                if (response) {
                    try {
                        await db.svAccount.update({ password: hash(newPass) }, {
                            where: {
                                email,
                            },
                        });
                        // Tạo một transporter bằng cách cung cấp thông tin về máy chủ email
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com', // Host của Gmail
                            port: 465, // Cổng SMTP của Gmail
                            secure: true,
                            auth: {
                                user: process.env.MAILER_EMAIL,
                                pass: process.env.PASS_EMAIL
                            }
                        });
                        // Định nghĩa các thông tin cần thiết cho email
                        let mailOptions = {
                            from: process.env.MAILER_EMAIL,
                            to: response.email,
                            subject: 'Lấy lại mật khẩu',
                            html: `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Email Template</title>
                                    <style>
                                        /* CSS styles go here */
                                        body {
                                            font-family: Arial, sans-serif;
                                            background-color: #f4f4f4;
                                            margin: 0;
                                            padding: 0;
                                        }
                                        .container {
                                            width: 100%;
                                            max-width: 600px;
                                            margin: 0 auto;
                                            padding: 20px;
                                            background-color: #ffffff;
                                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            border-radius: 10px;
                                            box-sizing: border-box;
                                        }
                                        h1 {
                                            color: #333333;
                                        }
                                        p {
                                            color: #666666;
                                        }
                                        .button {
                                            display: inline-block;
                                            padding: 10px 20px;
                                            background-color: #007bff;
                                            color: #ffffff;
                                            text-decoration: none;
                                            border-radius: 5px;
                                        }
                                        .bottom-bar {
                                            margin-top: 20px;
                                            padding-top: 20px;
                                            border-top: 1px solid #dddddd;
                                            text-align: center;
                                        }
                                        .pass {
                                            display: flex;
                                            justify-content: center; 
                                            align-items: center;
                                            font-size: 16px;
                                        }
                                        
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1>Lấy lại mật khẩu</h1>
                                        <p>Mật khẩu của bạn đã được thay đổi. Dưới đây là mật khẩu mới của bạn:</p>
                                        <p class="pass"><strong>${newPass}</strong></p>
                                        <a href="#" class="button">Đăng nhập</a>
                                        <div class="bottom-bar">
                                            <p>Nếu có bất kỳ câu hỏi hoặc thắc mắc, vui lòng liên hệ với chúng tôi:</p>
                                            <p>Email: devtester0321@gmail.com</p>
                                            <p>Điện thoại: 0987654321</p>
                                        </div>
                                    </div>
                                </body>
                                </html>
                            `
                        };


                        // Gửi email và xử lý kết quả
                        transporter.sendMail(mailOptions, (error, info) => {
                            resolve({
                                err: error ? 2 : 0,
                                msg: error ? `Email can't send to ${email}` : `Mật khẩu mới đã được gửi đến ${email}. Vui lòng kiểm tra email của bạn.`
                            })
                        });
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }

                } else {
                    resolve({
                        err: 2,
                        msg: "Email không tồn tại! Vui lòng kiểm tra lại thông tin.",
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const response = await db.gvAccount.findOne({
                    where: { email },
                    raw: true
                });
                if (response) {
                    try {
                        await db.gvAccount.update({ password: hash(newPass) }, {
                            where: {
                                email,
                            },
                        });
                        // Tạo một transporter bằng cách cung cấp thông tin về máy chủ email
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com', // Host của Gmail
                            port: 465, // Cổng SMTP của Gmail
                            secure: true,
                            auth: {
                                user: process.env.MAILER_EMAIL,
                                pass: process.env.PASS_EMAIL
                            }
                        });
                        // Định nghĩa các thông tin cần thiết cho email
                        let mailOptions = {
                            from: process.env.MAILER_EMAIL,
                            to: response.email,
                            subject: 'Lấy lại mật khẩu',
                            html: `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Email Template</title>
                                    <style>
                                        /* CSS styles go here */
                                        body {
                                            font-family: Arial, sans-serif;
                                            background-color: #f4f4f4;
                                            margin: 0;
                                            padding: 0;
                                        }
                                        .container {
                                            width: 100%;
                                            max-width: 600px;
                                            margin: 0 auto;
                                            padding: 20px;
                                            background-color: #ffffff;
                                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                            border-radius: 10px;
                                            box-sizing: border-box;
                                        }
                                        h1 {
                                            color: #333333;
                                        }
                                        p {
                                            color: #666666;
                                        }
                                        .button {
                                            display: inline-block;
                                            padding: 10px 20px;
                                            background-color: #007bff;
                                            color: #ffffff;
                                            text-decoration: none;
                                            border-radius: 5px;
                                        }
                                        .bottom-bar {
                                            margin-top: 20px;
                                            padding-top: 20px;
                                            border-top: 1px solid #dddddd;
                                            text-align: center;
                                        }
                                        .pass {
                                            display: flex;
                                            justify-content: center; 
                                            align-items: center;
                                            font-size: 16px;
                                        }
                                        
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1>Lấy lại mật khẩu</h1>
                                        <p>Mật khẩu của bạn đã được thay đổi. Dưới đây là mật khẩu mới của bạn:</p>
                                        <p class="pass"><strong>${newPass}</strong></p>
                                        <a href="#" class="button">Đăng nhập</a>
                                        <div class="bottom-bar">
                                            <p>Nếu có bất kỳ câu hỏi hoặc thắc mắc, vui lòng liên hệ với chúng tôi:</p>
                                            <p>Email: devtester0321@gmail.com</p>
                                            <p>Điện thoại: 0987654321</p>
                                        </div>
                                    </div>
                                </body>
                                </html>
                            `
                        };

                        // Gửi email và xử lý kết quả
                        transporter.sendMail(mailOptions, (error, info) => {
                            resolve({
                                err: error ? 2 : 0,
                                msg: error ? `Email can't send to ${email}` : `Mật khẩu mới đã được gửi đến ${email}. Vui lòng kiểm tra email của bạn.`
                            })
                        });
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }

                } else {
                    resolve({
                        err: 2,
                        msg: "Email không tồn tại! Vui lòng kiểm tra lại thông tin.",
                    })
                }
            } catch (error) {
                reject(error)
            }
            break;
    }
});

// đổi mật khẩu
export const changePassService = ({ email, password, newpassword, type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Sinh viên':
            try {
                const response = await db.svAccount.findOne({
                    where: { email },
                    raw: true
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                if (isCorrectPass) {
                    await db.svAccount.update({ password: hash(newpassword) }, {
                        where: {
                            email,
                        },
                    });
                    resolve({
                        err: 0,
                        msg: "Update successful!"
                    })
                    try {
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }
                } else {
                    resolve({
                        err: 2,
                        msg: "Email doesn't exists or pass is wrong!"
                    })
                }

            } catch (error) {
                console.log(error)
                reject(error)
            }
            break;
        case 'Quản trị viên':
            try {
                const response = await db.adAccount.findOne({
                    where: { email },
                    raw: true
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                if (isCorrectPass) {
                    await db.adAccount.update({ password: hash(newpassword) }, {
                        where: {
                            email,
                        },
                    });
                    resolve({
                        err: 0,
                        msg: "Update successful!"
                    })
                    try {
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }
                } else {
                    resolve({
                        err: 2,
                        msg: "Email doesn't exists or pass is wrong!"
                    })
                }

            } catch (error) {
                console.log(error)
                reject(error)
            }
            break;
        default:
            try {
                const response = await db.gvAccount.findOne({
                    where: { email },
                    raw: true
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                if (isCorrectPass) {
                    await db.gvAccount.update({ password: hash(newpassword) }, {
                        where: {
                            email,
                        },
                    });
                    resolve({
                        err: 0,
                        msg: "Update successful!"
                    })
                    try {
                    } catch (error) {
                        console.log(error)
                        resolve({
                            err: 2,
                            msg: "Can't update password!"
                        })
                    }
                } else {
                    resolve({
                        err: 2,
                        msg: "Email doesn't exists or pass is wrong!"
                    })
                }

            } catch (error) {
                console.log(error)
                reject(error)
            }
            break
    }
});
// lấy toàn bộ tài khoản
export const getAccountService = ({ type }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Quản trị viên':
            try {
                const response = await db.adAccount.findAll();
                resolve({
                    err: response.length === 0 ? 2 : 0,
                    msg: 'Account/admin',
                    data: response
                })
            } catch (error) {
                reject(error)
            }
            break;
        case 'Sinh viên':
            try {
                const response = await db.svAccount.findAll({
                    raw: true,
                    include: [
                        {
                            model: db.student,
                            as: 'studentAccount', // Sử dụng alias đã đặt tên là 'studentAccount'
                            attributes: ['name']
                        }
                    ],
                });
                resolve({
                    err: response.length === 0 ? 2 : 0,
                    msg: 'Account/Sv',
                    data: response
                })
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const response = await db.gvAccount.findAll({
                    raw: true,
                    include: [
                        {
                            model: db.lecturer,
                            as: 'lecturerAccount', // Sử dụng alias đã đặt tên là 'studentAccount'
                            attributes: ['name']
                        }
                    ],
                });
                resolve({
                    err: response.length === 0 ? 2 : 0,
                    msg: 'Account/Gv',
                    data: response
                })
            } catch (error) {
                reject(error)
            }
            break;
    }
})
// xóa tài khoản
export const deleteAccountService = ({ type, email }) => new Promise(async (resolve, reject) => {
    switch (type) {
        case 'Quản trị viên':
            try {
                const response = await db.adAccount.destroy({
                    where: {
                        email
                    },
                });

                resolve({
                    err: response ? 0 : 2,
                    msg: response ? 'Xóa thành công!' : "Xóa không thành công! Kiểm tra lại ID!"
                })
            } catch (error) {
                reject(error)
            }
            break;
        case 'Sinh viên':
            try {
                const response = await db.svAccount.destroy({
                    where: {
                        email
                    },
                });

                resolve({
                    err: response ? 0 : 2,
                    msg: response ? 'Xóa thành công!' : "Xóa không thành công! Kiểm tra lại ID!"
                })
            } catch (error) {
                reject(error)
            }
            break;
        default:
            try {
                const response = await db.gvAccount.destroy({
                    where: {
                        email
                    },
                });

                resolve({
                    err: response ? 0 : 2,
                    msg: response ? 'Xóa thành công!' : "Xóa không thành công! Kiểm tra lại ID!"
                })
            } catch (error) {
                reject(error)
            }
            break;
    }
}) 
