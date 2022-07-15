package com.cn.peixun.dao;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

//@Mapper
public interface StudentDao {
//    @Select("select * from student2 where id=#{id}")
    Student selectbyid(int id);
}
