package com.cn.peixun.action;

import com.cn.peixun.entity.XiTiAnswer;
import com.cn.peixun.services.XiTiAnswerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * 习题答案
 *
 * */
@Controller
@RequestMapping("/XiTi")
public class XiTiAnswerAction {
    @Autowired
    private XiTiAnswerServices xiTiAnswerServices;

    @RequestMapping("/answer")
    public ModelAndView answer(){

        ModelAndView mv=new ModelAndView("/meng/myspace/question");

        //查询所有的题目
        List<XiTiAnswer> xiTiAnswers = xiTiAnswerServices.getallAnswer();

        //判断是否为空
        if(xiTiAnswers==null||xiTiAnswers.size()==0){
            mv.addObject("message","没有查询结果");
        }
            mv.addObject("answer",xiTiAnswers);

        return mv;
    }
}
