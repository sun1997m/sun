package com.cn.peixun;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com.cn.peixun.dao")
@SpringBootApplication
public class PeixunApplication {

	public static void main(String[] args) {
		SpringApplication.run(PeixunApplication.class, args);
	}

}
