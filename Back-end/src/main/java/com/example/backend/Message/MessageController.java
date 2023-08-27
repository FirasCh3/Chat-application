package com.example.backend.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MessageController {
    @Autowired
    MessageService messageService;
    //TODO: checkout which endpoints has the message content as output and add encryption/decryption
    @PostMapping("/AddMessage")
    public void AddMessage(@RequestBody MessageEntity message){
        message.MessageDate= Timestamp.valueOf(LocalDateTime.now());
        messageService.AddMessage(message);
    }
    @GetMapping("/FindConversation")
    public List<MessageEntity> find(@RequestParam String UserId){

        return messageService.find(UserId);
    }
    @GetMapping("/FindMessages")
    public List<MessageEntity> findMessages(@RequestParam String SenderId,@RequestParam String RecipientId){
        return messageService.findMessages(SenderId,RecipientId);
    }
}
