package com.stylefeng.guns.modular.workflow.controller.management;

import com.stylefeng.guns.modular.workflow.util.Page;
import com.stylefeng.guns.modular.workflow.util.PageUtil;
import org.activiti.engine.ManagementService;
import org.activiti.engine.management.TableMetaData;
import org.activiti.engine.management.TablePage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.*;

/**
 * 数据库查询控制器
 * User: henryyan
 */
@Controller
@RequestMapping("/management/database")
public class DatabaseController {

    @Autowired
    ManagementService managementService;

    public static void main(String[] args) {
        //System.out.println(3.2+2.1);
        //System.out.println(Double.valueOf("3.2")+Double.valueOf("2.1"));
        //BigDecimal bigDecimalNum0 = new BigDecimal("3.2");
        //BigDecimal bigDecimalNum2 = new BigDecimal("2.1");
        //System.out.println(bigDecimalNum0.add(bigDecimalNum2).doubleValue());
        //System.out.println(3.2+2.1);
    }



    @RequestMapping("")
    public ModelAndView index(@RequestParam(value = "tableName", required = false) String tableName, HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/workflow/db/table.html");

        // 读取表
        Map<String, Long> tableCount = managementService.getTableCount();
        List<String> keys = new ArrayList<String>();
        keys.addAll(tableCount.keySet());
        Collections.sort(keys);

        TreeMap<String, Long> sortedTableCount = new TreeMap<String, Long>();

        for (String key : keys) {
            sortedTableCount.put(key, tableCount.get(key));
        }

        mav.addObject("tableCount", sortedTableCount);

        // 读取表记录
        if (StringUtils.isNotBlank(tableName)) {
            TableMetaData tableMetaData = managementService.getTableMetaData(tableName);
            mav.addObject("tableMetaData", tableMetaData);
            Page<Map<String, Object>> page = new Page<Map<String, Object>>(10);
            int[] pageParams = PageUtil.init(page, request);
            TablePage tablePages = managementService.createTablePageQuery().tableName(tableName).listPage(pageParams[0], pageParams[1]);

            page.setResult(tablePages.getRows());
            page.setTotalCount(tableCount.get(tableName));
            mav.addObject("page", page);
        }
        return mav;
    }

}
