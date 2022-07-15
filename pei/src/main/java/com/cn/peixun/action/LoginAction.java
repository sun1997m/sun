package com.cn.peixun.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 页面跳转
 *
 * */
@Controller
@RequestMapping("/login")
public class LoginAction {
    @RequestMapping("/tiao1")
    public ModelAndView myindex(){
         ModelAndView mv=new ModelAndView("/meng/myindex");
         return mv;

    }

    @RequestMapping("/top")
    public ModelAndView top(){
        ModelAndView mv=new ModelAndView("/meng/top");
        return mv;

    }

    @RequestMapping("/sidebar")
    public ModelAndView sidebar(){
        ModelAndView mv=new ModelAndView("/meng/sidebar");
        return mv;

    }

    @RequestMapping("/bottom")
    public ModelAndView bottom(){
        ModelAndView mv=new ModelAndView("/meng/bottom");
        return mv;

    }

    @RequestMapping("/more")
    public ModelAndView more(){
        ModelAndView mv=new ModelAndView("/meng/more");
        return mv;

    }

    @RequestMapping("/studied")
    public ModelAndView studied(){
        ModelAndView mv=new ModelAndView("/meng/myspace/studied");

        return mv;

    }

    @RequestMapping("/study")
    public ModelAndView study(){
        ModelAndView mv=new ModelAndView("/meng/myspace/study");

        return mv;

    }

    @RequestMapping("/myinspection")
    public ModelAndView myinspection(){
        ModelAndView mv=new ModelAndView("/meng/myspace/myinspection");

        return mv;

    }




}
