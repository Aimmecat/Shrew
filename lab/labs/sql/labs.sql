/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : labs

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2021-03-06 11:07:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) DEFAULT NULL COMMENT '部门名称',
  `contact` varchar(50) DEFAULT NULL COMMENT '联系人',
  `contact_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_by` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `updated_by` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `deleted` tinyint(4) DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '通信所3', '张三', null, '这是一条备注', '2019-12-03 17:31:28', '2021-03-06 10:18:49', 'TE00000001', 'root', '0');
INSERT INTO `department` VALUES ('2', '通信所', '张三', '1532384234234', '这是一条备注', '2019-12-03 17:48:06', '2019-12-03 17:48:06', 'TE00000001', 'TE00000001', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(40) NOT NULL COMMENT '登录号',
  `name` varchar(32) DEFAULT NULL COMMENT '用户姓名',
  `sex` tinyint(1) DEFAULT '1' COMMENT '用户性别',
  `enabled` tinyint(1) DEFAULT '1' COMMENT '是否启用',
  `password` varchar(41) DEFAULT NULL COMMENT '密码',
  `department` varchar(128) DEFAULT NULL COMMENT '部门',
  `phone` varchar(32) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(128) DEFAULT NULL COMMENT '电子邮件',
  `created_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `updated_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pk` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'root', '管理员', '1', '1', '*E6CC90B878B948C35E92B003C792C46C58C4AF40', '1', '1', '333', '1', '1', '2020-04-08 16:24:10', '2020-12-07 11:15:27');
