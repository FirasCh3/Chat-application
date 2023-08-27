package com.example.backend.User;

import com.example.backend.Message.MessageEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.Set;

@Entity
public class UserEntity {
    @Id
    public String UserId;
    public String UserName;
    public String Password;
    @OneToMany(mappedBy = "Sender")
    @JsonBackReference
    private Set<MessageEntity> Messages;

}
