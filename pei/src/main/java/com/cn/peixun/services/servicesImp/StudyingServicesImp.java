package com.cn.peixun.services.servicesImp;

import com.cn.peixun.dao.StudyingDao;
import com.cn.peixun.entity.StudyStart;
import com.cn.peixun.entity.WenJian;
import com.cn.peixun.services.StudyingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyingServicesImp implements StudyingServices {
    @Autowired
    private StudyingDao studyingDao;

    @Override
    public List<StudyStart> selall() {
        return studyingDao.selall();
    }

    @Override
    public WenJian selwendang(int id) {
        return studyingDao.selwendang(id);
    }

    @Override
    public int count(int id) {
        return studyingDao.count(id);
    }


}
