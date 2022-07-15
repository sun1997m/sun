package com.cn.peixun.entity;
//文件相关文档

import lombok.Data;

@Data
public class WengDang {
    private int wenjianwdId;
    private String wenjianwdName;
    private String wenjianwdType;
    private int wenjianwdDaXiao;
    private int wenjianwdNo;//关联字段

}
