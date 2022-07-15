package com.cn.peixun.entity;

import lombok.Data;

@Data
public class Student {
    private int stuId;
    private String stuNo;
    private String stuAccount;
    private String stuPass;
    private String stuName;
    private String stuSex;
    private String stuBirth;
    private int stuGang;
    private int stuXueli;
    private int stuZhuanye;
    private String stuZhiwu;
    private String stuRole;
    private StudyStart stuJHtime;
    private String stuLastTime;
    private int stuCounts;
    private String stuStatus;
}
