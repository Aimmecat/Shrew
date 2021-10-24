package cn.edu.sdu.ise.labs.utils;

import lombok.Data;
import org.springframework.util.Assert;

/**
 * @Description: 分页工具类
 * @Author: Stonered
 * @Date: Created on 2018/12/28
 */
@Data
public class PageUtils {
    private static final int DEFAULT_PAGE_SIZE = 10;
    private static final int DEFAULT_PAGE = 1;

    private Integer page = DEFAULT_PAGE;
    private Integer pageSize = DEFAULT_PAGE_SIZE;

    /**
     * 总页数
     */
    private Integer totalPages;

    /**
     * 总记录数
     */
    private Integer total;

    /**
     * 从查询的结果集中，取记录的起始位置
     */
    private Integer offset;

    /**
     * 取记录数
     */
    private Integer limit;

    public PageUtils(Integer page, Integer pageSize, Integer totalRecords) {
        if (page != null) {
            this.page = page;
        }
        if (pageSize != null) {
            this.pageSize = pageSize;
        }
        Assert.notNull(totalRecords, "totalRecords不能为空");
        Assert.isTrue(this.pageSize != 0, "pageSize不能为0");

        this.total = totalRecords;
        this.totalPages = (totalRecords + this.pageSize - 1) / this.pageSize;

        Assert.isTrue(this.page == 1 ||
                this.page <= this.totalPages && this.page > 0, "页码超出范围");

        offset = (this.page - 1) * this.pageSize;
        limit = this.pageSize;
    }

    public static Integer getPage(Integer page) {
        if (null == page
                || page == 0) {
            return DEFAULT_PAGE;
        }

        return page;
    }

    public static Integer getPageSize(Integer pageSize) {
        if (null == pageSize
                || pageSize == 0) {
            return DEFAULT_PAGE_SIZE;
        }

        return DEFAULT_PAGE_SIZE;
    }

}
