package com.example.backend.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
    @Autowired
    UserService userService;
    @GetMapping("/GetUsers")
    public List<UserEntity> GetUsers(){
        return userService.GetUsers();
    }
    @GetMapping("/findByName")
    public List<UserEntity> findByName(@RequestParam String UserName){
        return userService.GetByUserName(UserName);
    }
    @PostMapping("/addUser")
    public void addUser(@RequestBody UserEntity user){
        user.UserId= String.valueOf(UUID.randomUUID());
        user.Password=bcrypt.encode(user.Password);
        userService.addUser(user);
    }
    @PostMapping("/Authenticate")
    public Map<String,UserEntity> authenticate(@RequestBody UserEntity user){
        return userService.auth(user);
    }
    @GetMapping("/findUser")
    public List<UserEntity> findUser(@RequestParam String Username){
        return userService.findUser(Username);
    }
}
