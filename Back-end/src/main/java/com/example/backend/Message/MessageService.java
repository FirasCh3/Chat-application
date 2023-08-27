package com.example.backend.Message;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;
    public void AddMessage(MessageEntity message){
        messageRepository.save(message);
    }
    public List<MessageEntity> find(String UserId){
        return messageRepository.find(UserId);
    }
    public List<MessageEntity> findMessages(String SenderId,String RecipientId){
        return messageRepository.findMessages(SenderId,RecipientId);
    }
}
