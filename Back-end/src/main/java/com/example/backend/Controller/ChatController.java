package com.example.backend.Controller;
import com.example.backend.Models.MessageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import javax.sound.midi.Receiver;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/sendMessage/{Sender}/{Receiver}")
    public void SendMessage(MessageModel message, @DestinationVariable String Sender,@DestinationVariable String Receiver){
        simpMessagingTemplate.convertAndSend("/topic/messages/"+Sender,message);
        simpMessagingTemplate.convertAndSend("/topic/messages/"+ Receiver,message);

    }

}
