package com.spencer.surfhq.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Surf World!";
    }
}
