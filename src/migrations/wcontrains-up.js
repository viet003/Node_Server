'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Thêm ràng buộc ngoại tuyến giữa 'gvAccounts' và 'lectures'
        await queryInterface.addConstraint('gvAccounts', {
            fields: ['userid'],
            type: 'foreign key',
            name: 'fk_gvAccount_userid', // Tên constraint phải là duy nhất
            references: {
                table: 'lecturers',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // lecturers và topic
        await queryInterface.addConstraint('topics', {
            fields: ['lecturerid'],
            type: 'foreign key',
            name: 'fk_topic_lecturerid', // Tên constraint phải là duy nhất
            references: {
                table: 'lecturers',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // topics và group
        await queryInterface.addConstraint('groups', {
            fields: ['topicid'],
            type: 'foreign key',
            name: 'fk_group_topicid', // Tên constraint phải là duy nhất
            references: {
                table: 'topics',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // topics và annocement
        await queryInterface.addConstraint('announcements', {
            fields: ['topicid'],
            type: 'foreign key',
            name: 'fk_announcement_topicid', // Tên constraint phải là duy nhất
            references: {
                table: 'topics',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // anocements và comments
        await queryInterface.addConstraint('comments', {
            fields: ['announcementid'],
            type: 'foreign key',
            name: 'fk_comment_announcementid', // Tên constraint phải là duy nhất
            references: {
                table: 'announcements',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // Thêm ràng buộc ngoại tuyến giữa 'svAccounts' và 'students'
        await queryInterface.addConstraint('svAccounts', {
            fields: ['userid'],
            type: 'foreign key',
            name: 'fk_svAccount_userid', // Tên constraint phải là duy nhất
            references: {
                table: 'students',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // quan hệ student vs group
        await queryInterface.addConstraint('groups', {
            fields: ['studentid'],
            type: 'foreign key',
            name: 'fk_group_studentid', // Tên constraint phải là duy nhất
            references: {
                table: 'students',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        // students với sv account
        // await queryInterface.addConstraint('comments', {
        //     fields: ['userid'],
        //     type: 'foreign key',
        //     name: 'fk_comment_userid', // Tên constraint phải là duy nhất
        //     references: {
        //         table: 'students',
        //         field: 'id'
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE'
        // });
    },
    async down(queryInterface, Sequelize) {
        // Xóa ràng buộc ngoại tuyến giữa 'gvAccounts' và 'lectures'
        await queryInterface.removeConstraint('gvAccounts', 'fk_gvAccount_userid');

        // Xóa ràng buộc ngoại tuyến giữa 'svAccounts' và 'students'
        await queryInterface.removeConstraint('svAccounts', 'fk_svAccount_userid');

        // Xóa ràng buộc ngoại tuyến giữa 'comments' và 'students'
        await queryInterface.removeConstraint('comments', 'fk_comment_userid');

        // Xóa ràng buộc ngoại tuyến giữa 'comments' và 'announcements'
        await queryInterface.removeConstraint('comments', 'fk_comment_announcementid');

        // Xóa ràng buộc ngoại tuyến giữa 'announcements' và 'topics'
        await queryInterface.removeConstraint('announcements', 'fk_announcement_topicid');

        // Xóa ràng buộc ngoại tuyến giữa 'groups' và 'topics'
        await queryInterface.removeConstraint('groups', 'fk_group_topicid');

        // Xóa ràng buộc ngoại tuyến giữa 'topics' và 'lecturers'
        await queryInterface.removeConstraint('topics', 'fk_topic_lecturerid');

        // Xóa ràng buộc ngoại tuyến giữa 'groups' và 'students'
        await queryInterface.removeConstraint('groups', 'fk_group_studentid');

    }
};
