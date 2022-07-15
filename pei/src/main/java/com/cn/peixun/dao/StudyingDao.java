package com.cn.peixun.dao;

import com.cn.peixun.entity.StudyStart;
import com.cn.peixun.entity.WenJian;
import com.cn.peixun.entity.WengDang;

import java.util.List;

public interface StudyingDao {
    //查询所有正在学习的内容
    List<StudyStart> selall();

    //查询相关文档,指定相关教材id

    WenJian selwendang(int id);

    //计算相关文档条数
    int count(int id);

}
