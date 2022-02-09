package com.overzealouspelican.foodinventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.overzealouspelican.foodinventory.*")
@ComponentScan(basePackages = { "com.overzealouspelican.foodinventory.*" })
@EntityScan("com.overzealouspelican.foodinventory.*")
public class FoodInventoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodInventoryApplication.class, args);
	}

}
