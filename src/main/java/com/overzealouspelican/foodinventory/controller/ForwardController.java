package com.overzealouspelican.foodinventory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {
    @GetMapping(value = {"/inventory", "/add-items", "/out-of-stock"})
    public String frontend() {
        return "forward:/";
    }
}
