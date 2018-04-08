package com.stylefeng.guns.config.properties;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = WorkflowProperties.WORKFLOW_PROPERTIES_PREFIX)
public class WorkflowProperties {

    public static final String WORKFLOW_PROPERTIES_PREFIX = "activiti";

    //@Value("#{activiti.exportDiagramPath}")
    private String exportDiagramPath;

    public String getExportDiagramPath() {
        return exportDiagramPath;
    }

    public void setExportDiagramPath(String exportDiagramPath) {
        this.exportDiagramPath = exportDiagramPath;
    }
}
