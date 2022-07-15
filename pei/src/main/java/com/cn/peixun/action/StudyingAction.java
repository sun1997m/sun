package com.cn.peixun.action;

import com.cn.peixun.entity.StudyStart;
import com.cn.peixun.entity.WenJian;
import com.cn.peixun.services.StudyingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * 正在学习的内容
 * */

@Controller
@RequestMapping("/myspace")
public class StudyingAction {

    @Autowired
    private StudyingServices studyingServices;

    @RequestMapping("/studying")
    public ModelAndView studying(){

        ModelAndView mv=new ModelAndView("meng/myspace/studying");



        //调用查询所有
        List<StudyStart> selall = studyingServices.selall();

        if(selall==null||selall.size()==0){
            //集合为空或者没有元素
            mv.addObject("mes","没有相关信息");
        }


        //不为空
        mv.addObject("studying",selall);

        return mv;

    }

/**
 * 跳转到view页面
 * */
    @RequestMapping("/viewbook")
    public ModelAndView viewbook(int wenjianId){
        ModelAndView mv=new ModelAndView("/meng/myspace/viewbook");

        System.out.println(wenjianId);

        int count = studyingServices.count(wenjianId);

        //调用查询文件方法
        WenJian wenJian = studyingServices.selwendang(wenjianId);

        //判断是否为空
        if(wenJian==null){
            mv.addObject("mes","没有相关资料");
        }

        mv.addObject("wenjian",wenJian);

        mv.addObject("count",count);

        return mv;

    }

}
