package com.stylefeng.guns.modular.workflow.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * 分页工具
 *
 * @author henryyan
 */
public class PageUtil {

    public static int PAGE_SIZE = 15;

    public static int[] init(Page<?> page, HttpServletRequest request) {
        String p = request.getParameter("p");//只有不是空的时候才去取
        if(StringUtils.isNotBlank(p)){
            int pageNumber = Integer.parseInt(StringUtils.defaultIfBlank(request.getParameter("p"), "1"));
            page.setPageNo(pageNumber);
        }
        String ps = request.getParameter("ps");//只有不是空的时候才去取
        if(StringUtils.isNotBlank(ps)){
            int pageSize = Integer.parseInt(StringUtils.defaultIfBlank(request.getParameter("ps"), String.valueOf(PAGE_SIZE)));
            page.setPageSize(pageSize);
        }

        int firstResult = page.getFirst() - 1;
        int maxResults = page.getPageSize();
        return new int[]{firstResult, maxResults};
    }

}
