package com.cn.peixun.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServicesImp implements StudentServices {

@Autowired
private StudentDao studentDao;

    public Student selectby(int id) {

        return studentDao.selectbyid(id);
    }
}
