package com.example.backend.User;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {
    @Query(value = "select u from UserEntity u where u.UserName=?1")
    List<UserEntity> findByUserName(String UserName);
}
