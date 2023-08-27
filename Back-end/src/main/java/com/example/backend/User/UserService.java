package com.example.backend.User;

import com.example.backend.Message.MessageEntity;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder();
    public List<UserEntity> GetUsers(){
        return  userRepository.findAll();
    }
    public List<UserEntity> GetByUserName(String UserName){
        return userRepository.findByUserName(UserName);
    }
    public void addUser(UserEntity user){
        userRepository.save(user);
    }
    public Map<String,UserEntity> auth(UserEntity user){
        List<UserEntity> Users=userRepository.findByUserName(user.UserName);

        for (UserEntity element:Users) {
            if(Objects.equals(element.UserName, user.UserName) && bCryptPasswordEncoder.matches(user.Password, element.Password)){
                HashMap token=new HashMap<>();
                UserEntity AuthenticatedUser=new UserEntity();
                AuthenticatedUser.UserName= element.UserName;
                AuthenticatedUser.UserId= element.UserId;
                token.put("token",AuthenticatedUser);
                return token;
            }
        }
        return null;

    }
    public List<UserEntity> findUser(String username){
        return userRepository.findByUserName(username);
    }
}
