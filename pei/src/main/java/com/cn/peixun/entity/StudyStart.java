package com.cn.peixun.entity;

import lombok.Data;

import java.util.List;

//学习内容
@Data
public class StudyStart {
    private int studystartId;
    private int studyNo;
    private String studystartLessonName;
    private String studystartChapterName;
    private String studystartTime;
    private int studystartCounts;
    private String studyStatus;
    private int stuJiaoCai;
    private List<WenJian> wenJian;
}
