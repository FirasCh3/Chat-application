package com.example.backend.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,String> {
    @Query(value = "select m from MessageEntity m where m.Sender.UserId=?1 or m.Recipient.UserId=?1")
    public List<MessageEntity> find(String UserId);
    @Query(value = "select m from MessageEntity m where m.Sender.UserId=?1 and m.Recipient.UserId=?2 or m.Sender.UserId=?2 and m.Recipient.UserId=?1 order by m.MessageDate  ")
    public List<MessageEntity> findMessages(String SenderId,String RecipientId);
}
