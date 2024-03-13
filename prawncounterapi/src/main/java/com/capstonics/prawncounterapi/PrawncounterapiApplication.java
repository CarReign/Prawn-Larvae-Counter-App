package com.capstonics.prawncounterapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import nu.pattern.OpenCV;

@SpringBootApplication
public class PrawncounterapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrawncounterapiApplication.class, args);
		OpenCV.loadLocally();
	}

}
