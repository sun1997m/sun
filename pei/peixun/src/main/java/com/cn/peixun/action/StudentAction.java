package com.cn.peixun.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/stu")
public class StudentAction {

    @Autowired
    private StudentServices studentServices;

    @RequestMapping("/sel")
    public ModelAndView sel(int id){

        ModelAndView mv=new ModelAndView("stu");

        Student student = studentServices.selectby(id);

        System.out.println(student);

        mv.addObject("stu",student);

        return mv;


    }
}
