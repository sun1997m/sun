package com.cn.peixun.services.servicesImp;

import com.cn.peixun.dao.XiTiAnswerDao;
import com.cn.peixun.entity.XiTiAnswer;
import com.cn.peixun.services.XiTiAnswerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class XiTiAnswerServicesImp implements XiTiAnswerServices{
  @Autowired
  private XiTiAnswerDao xiTiAnswerDao;
    @Override
    public List<XiTiAnswer> getallAnswer() {
        return xiTiAnswerDao.getallAnswer();
    }
}
