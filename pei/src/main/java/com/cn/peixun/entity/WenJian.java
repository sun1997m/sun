package com.cn.peixun.entity;

import lombok.Data;

import java.util.List;

@Data
public class WenJian {
    private int wenjianId;
    private String wenjianJiaocaiType;
    private int wenjianShangchuanId;
    private String wenjianTitle;
    private String wenjianType;
    private int wenjianDaxiao;
    private String wenjianJiaocaimiaoshu;
    private String wenjianLujin;
    private int wenjianCishu;
    private int wenjianPinji;
    private String wenjianPinjia;
    private String wenjianFinish;
    private int wenjianGangwei;

    private List<WengDang> wengDangs;

}
