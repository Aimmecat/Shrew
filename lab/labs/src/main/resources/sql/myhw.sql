/*
Navicat MySQL Data Transfer

Source Server         : localohost
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : image_search

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2019-12-02 09:38:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for myhw
-- ----------------------------
DROP TABLE IF EXISTS `myhw`;
CREATE TABLE `myhw` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `equipment_name`  varchar(50) NOT NULL COMMENT '设备名称',
      `equipment_value` varchar(50) DEFAULT NULL COMMENT '设备价格区间',
      `user_people`     varchar(50) DEFAULT NULL COMMENT '使用人',
      `home_id`         varchar(50) DEFAULT NULL COMMENT '房间号',
      `deleted`         tinyint(4) DEFAULT '0' COMMENT '删除标记',
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
