package cn.edu.sdu.ise.labs.utils;

import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

/**
 * @Description: POJO对象处理类
 * @Author: Keo
 * @Date: Created on 2019/3/1
 */
public class FormatUtils {
    /**
     * 用于产生单号的日期格式化对象
     */
    public static DateTimeFormatter smallDateFormatter = DateTimeFormatter.ofPattern("yyMMdd");

    /**
     * 格式化全日期和时间的对象
     */
    public static DateTimeFormatter fullDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 仅格式化日期的对象
     */
    public static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 小时分钟格式
     */
    public static SimpleDateFormat hourTimeFormatter = new SimpleDateFormat("HH:mm");

    /**
     * 自动将对象的字符串属性的字段进行首位空格去除
     *
     * @param o 要处理的对象
     */
    public static void trimWhitespace(Object o) {
        if (o == null) {
            return;
        }

        Class<?> clazz = o.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getType() == String.class) {
                boolean accessible = field.isAccessible();
                field.setAccessible(true);
                try {
                    field.set(o, StringUtils.trimWhitespace((String) field.get(o)));
                } catch (Exception ex) {

                }

                field.setAccessible(accessible);
            }
        }
    }

    /**
     * 将对象所有String类型的字段trimToNull
     *
     * @param o
     */
    public static void trimFieldToNull(Object o) {
        if (o == null) {
            return;
        }

        Class<?> clazz = o.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getType() == String.class) {
                boolean accessible = field.isAccessible();
                field.setAccessible(true);
                try {
                    String value = trimToNull((String) field.get(o));
                    field.set(o, value);
                } catch (Exception ex) {

                }

                field.setAccessible(accessible);
            }
        }
    }

    /**
     * 判断两个字符串是否相等
     *
     * @param str1
     * @param str2
     */
    public static boolean isStringEqual(String str1, String str2) {
        if (str1 == str2) {
            return true;
        }

        if (str1 == null) {
            return false;
        }

        return str1.equals(str2);
    }

    /**
     * 将字符串
     *
     * @param str
     * @return 非null的一个首位不含空格字符串
     */
    public static String trimToEmpty(String str) {
        return str == null ? "" : StringUtils.trimWhitespace(str);
    }

    /**
     * 将一个字符串首尾空格去掉，如果为空，返回null
     *
     * @param val 待处理的字符串
     * @return
     */
    public static String trimToNull(String val) {
        val = StringUtils.trimWhitespace(val);
        if (val == null || val.isEmpty()) {
            val = null;
        }

        return val;
    }

    /**
     * 构造模糊匹配的字符串
     *
     * @param value
     * @return
     */
    public static String makeFuzzySearchTerm(String value) {
        value = FormatUtils.trimToNull(value);
        if (value == null) {
            return null;
        }

        return '%' + value + '%';
    }

    /**
     * 产生以prefix为前缀的单号。序数部分采用纳秒生成，保证长度固定
     * 格式为：前缀 + 日期 + 16位十进制数字纳秒序号
     *
     * @param prefix 单号前缀
     * @return 产生一个包含16位纳秒序号的单号字符串
     */
    public static String generateCode(String prefix) {
        String nsTimeString = String.format("%016d", System.nanoTime());
        if (nsTimeString.length() > 16) {
            // 右截断
            nsTimeString = nsTimeString.substring(nsTimeString.length() - 16);
        }

        LocalDateTime date = LocalDateTime.now();
        return String.format("%s%s%s", prefix, date.format(smallDateFormatter), nsTimeString);
    }

    /**
     * 产生以单号为前缀，序号为后缀的明细单号，保证长度固定
     *
     * @param code  单号
     * @param index 序号
     * @return
     */
    public static String generateItemCode(String code, int index) {
        Assert.isTrue(index < 10000, "序号不能超过9999");
        return String.format("%s%04d", code, index);
    }

    public static String formatDate(Date date, DateTimeFormatter formatter) {
        if (date == null) {
            return null;
        }

        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();
        return localDateTime.format(formatter);
    }

    /**
     * 格式化成全日期时间格式：yyyy-MM-dd HH:mm:ss
     *
     * @param date 日期对象
     * @return 格式化字符串
     */
    public static String formatFullDate(Date date) {
        return formatDate(date, fullDateTimeFormatter);
    }

    /**
     * 格式化成日期时间格式：yyyy-MM-dd
     *
     * @param date 日期对象
     * @return 格式化字符串
     */
    public static String formatDate(Date date) {
        return formatDate(date, dateFormatter);
    }

    /**
     * 解析日期字符串，线程安全
     *
     * @param dateString 格式为yyyy-MM-dd的字符串
     * @return 日期对象
     */
    public static Date parseDate(String dateString) {
        if (StringUtils.isEmpty(dateString)) {
            return null;
        }

        LocalDate localDate = LocalDate.parse(dateString, dateFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDate.atStartOfDay(zoneId);
        return Date.from(zdt.toInstant());
    }

    /**
     * 解析日期时间字符串，线程安全
     *
     * @param dateTimeString 格式为yyyy-MM-dd HH:mm:ss的字符串
     * @return
     */
    public static Date parseDateTime(String dateTimeString) {
        if (StringUtils.isEmpty(dateTimeString)) {
            return null;
        }

        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeString, fullDateTimeFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDateTime.atZone(zoneId);
        return Date.from(zdt.toInstant());
    }

    /**
     * 将日期格式2019-01-01，格式化成第二天的日期格式：2019-01-02，用于时间范围的过滤
     *
     * @param dateString
     * @return
     */
    public static String formatEndDate(String dateString) {
        if (StringUtils.isEmpty(dateString)) {
            return null;
        }

        LocalDate localDate = LocalDate.parse(dateString, dateFormatter);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDate.atStartOfDay(zoneId);
        zdt = zdt.plusDays(1);
        return formatDate(Date.from(zdt.toInstant()), dateFormatter);
    }

    /**
     * 转值为字符串
     *
     * @param value 对象
     * @return 字符串
     */
    public static String toString(Object value) {
        if (value == null) {
            return "";
        } else if (value instanceof Boolean) {
            if (value.equals(true)) {
                return "1";
            } else {
                return "0";
            }
        }

        return value.toString();
    }

    /**
     * 解析日期时间字符
     */
    public static Date parseDateTime(String dateTimeString, SimpleDateFormat formatter) {
        if (StringUtils.isEmpty(dateTimeString)) {
            return null;
        }

        try {
            return formatter.parse(dateTimeString);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 转换成 Calendar
     *
     * @param dateTimeString
     * @param formatter
     * @return
     */
    public static Calendar getCronCalendar(String dateTimeString, SimpleDateFormat formatter) {
        Date date = FormatUtils.parseDateTime(dateTimeString, formatter);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        return calendar;
    }

    public static boolean isEmpty(String str) {
        if (str == null) {
            return true;
        }

        return str.isEmpty();
    }
}
