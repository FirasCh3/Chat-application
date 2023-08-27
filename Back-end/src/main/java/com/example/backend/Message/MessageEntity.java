package com.example.backend.Message;

import com.example.backend.User.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class MessageEntity {
    @Id
    @GeneratedValue
    public Integer MessageId;
    public String Content;
    @ManyToOne
    @JoinColumn
    public UserEntity Sender;
    @ManyToOne
    @JoinColumn
    public UserEntity Recipient;
    public java.sql.Timestamp MessageDate;
}
