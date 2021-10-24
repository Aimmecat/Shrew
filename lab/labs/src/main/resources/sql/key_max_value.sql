/*
Navicat MySQL Data Transfer

Source Server         : hh
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : magic_tms

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-05-14 09:41:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for key_max_value
-- ----------------------------
DROP TABLE IF EXISTS `key_max_value`;
CREATE TABLE `key_max_value` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `tenant_code` varchar(20) DEFAULT NULL COMMENT '租户代码',
  `key_prefix` char(2) DEFAULT NULL COMMENT '业务主键前缀',
  `date_part` char(6) DEFAULT NULL COMMENT '日期',
  `current_value` int DEFAULT 1 COMMENT '业务后缀',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

ALTER TABLE `key_max_value`
ADD UNIQUE INDEX `uk` (`tenant_code`, `key_prefix`, `date_part`) ;
-- ----------------------------
-- Records of key_max_value
-- ----------------------------
