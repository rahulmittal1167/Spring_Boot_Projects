package com.rahul.videocall.user;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

/**
 * Implementation of User Service
 */
@Service
public class UserService {

    private static final List<User> USER_LIST = new ArrayList<>();

    public void register(User user){
        user.setStatus("online");
        USER_LIST.add(user);
    }

    public User login(User user){
        var userIndex = IntStream.range(0, USER_LIST.size())
                .filter(i -> USER_LIST.get(i).getEmail().equals(user.getEmail()))
                .findAny()
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        var cUser = USER_LIST.get(userIndex);
        if(!cUser.getPassword().equals(user.getPassword())){
            throw new RuntimeException("Password Incorrect");
        }
        cUser.setStatus("online");
        return cUser;
    }

    public void logout(String email){
        var userIndex = IntStream.range(0, USER_LIST.size())
                .filter(i -> USER_LIST.get(i).getEmail().equals(email))
                .findAny()
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        USER_LIST.get(userIndex).setStatus("offline");
    }

    public List<User> findAll(){
        return USER_LIST;
    }
}
