package com.cn.peixun.services;


import com.cn.peixun.entity.StudyStart;
import com.cn.peixun.entity.WenJian;

import java.util.List;


public interface StudyingServices {
    List<StudyStart> selall();
    WenJian selwendang(int id);
    int count(int id);
}
