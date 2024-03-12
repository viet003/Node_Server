import express from "express";
import * as authController from "../controllers/authControllers"
import * as postController from "../controllers/postControllers"
import * as userController from "../controllers/userControllers"
import * as topicController from "../controllers/topicControllers"
import * as groupController from "../controllers/groupController"
import * as announcementController from "../controllers/announcementController"
import * as commentService from "../controllers/commentController" 
const router = express.Router()


// login and register...
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/getpass', authController.getPass)
router.put('/changepass', authController.changePass)
router.delete('/deleteaccount', authController.deleteAccount)
router.post('/getaccount', authController.getAccount)

// post control
router.post('/createpost', postController.createPost)
router.get('/getpost', postController.getPost)
router.delete('/deletepost', postController.deletePost)


// user control
router.post('/createuser', userController.createUser)
router.post('/getuser', userController.getUser)
router.delete('/deleteuser', userController.deleteUser)
router.put('/updateuser', userController.updateUser)


// topic controller
router.post('/createtopic', topicController.createTopic)
router.put('/edittopic', topicController.editTopic)
router.post('/gettopic', topicController.getTopic)
router.delete('/deletetopic', topicController.deleteTopic)
router.post('/gettopicinfor', topicController.getTopicInfo)

// group controller
router.post('/addtogroup', groupController.addToGroup)
router.put('/accepttogroup', groupController.acceptToGroup)
router.delete('/removefromgroup', groupController.removeFromGroup)
router.post('/getgroup', groupController.getGroup)
router.post('/getstudent', groupController.getStudent)

// announcements
router.post('/getannouncements', announcementController.getAllAnnouncement)
router.post('/createannouncement', announcementController.createAnnouncement)
router.put('/editannouncement', announcementController.editAnnouncement)
router.delete('/deleteannouncement', announcementController.deleteAnnouncement)

// comments
router.post('/getcomments', commentService.getAllComments)
router.post('/createcomment', commentService.createComment)

export default router
