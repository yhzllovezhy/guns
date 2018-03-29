package com.stylefeng.guns.modular.workflow.dto;

import org.activiti.engine.repository.ProcessDefinition;

import java.util.Date;

public class ProcessAndDeployPageDto{

    private String processId;
    private String processDeploymentId;
    private String processName;
    private String processKey;
    private int processVersion;
    private String processResourceName;
    private String processDiagramResourceName;
    private Date deploymentTime;
    private boolean processSuspended;

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    public String getProcessDeploymentId() {
        return processDeploymentId;
    }

    public void setProcessDeploymentId(String processDeploymentId) {
        this.processDeploymentId = processDeploymentId;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getProcessKey() {
        return processKey;
    }

    public void setProcessKey(String processKey) {
        this.processKey = processKey;
    }

    public int getProcessVersion() {
        return processVersion;
    }

    public void setProcessVersion(int processVersion) {
        this.processVersion = processVersion;
    }

    public String getProcessResourceName() {
        return processResourceName;
    }

    public void setProcessResourceName(String processResourceName) {
        this.processResourceName = processResourceName;
    }

    public String getProcessDiagramResourceName() {
        return processDiagramResourceName;
    }

    public void setProcessDiagramResourceName(String processDiagramResourceName) {
        this.processDiagramResourceName = processDiagramResourceName;
    }

    public Date getDeploymentTime() {
        return deploymentTime;
    }

    public void setDeploymentTime(Date deploymentTime) {
        this.deploymentTime = deploymentTime;
    }

    public boolean isProcessSuspended() {
        return processSuspended;
    }

    public void setProcessSuspended(boolean processSuspended) {
        this.processSuspended = processSuspended;
    }
}
