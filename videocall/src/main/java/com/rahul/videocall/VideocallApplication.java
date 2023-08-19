package com.rahul.videocall;

import com.rahul.videocall.user.User;
import com.rahul.videocall.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VideocallApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideocallApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(UserService service){
		return args -> {
			service.register(User.builder()
							.username("Rahul")
							.email("Rahul@gmail.com")
							.password("111")
					.build());
			service.register(User.builder()
					.username("Rohit")
					.email("Rohit@gmail.com")
					.password("111")
					.build());
			service.register(User.builder()
					.username("Ram")
					.email("Ram@gmail.com")
					.password("111")
					.build());
		};
	}
}
