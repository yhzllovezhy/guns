package com.stylefeng.guns.modular.workflow.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @Author: zh
 * @Description :
 * @Date Created in 10:25 2018/3/14
 * @Modified By :
 */
@ConfigurationProperties(prefix = "spring.datasource.activiti")
@Data
@Component
@PropertySource(value="classpath:/application-activiti.properties")
public class ActivitiDataSourceProperties {

    private String url;

    private String username;

    private String password;

    private String driverClassName;

    private Integer maxActive;

    private Integer initialSize;

    private Integer minIdle;

    private Integer maxWait;

    private Integer maxPoolPreparedStatementPerConnectionSize;

    private Integer timeBetweenEvictionRunsMillis;

    private Integer minEvictableIdleTimeMillis;

    private Boolean poolPreparedStatements;

}
