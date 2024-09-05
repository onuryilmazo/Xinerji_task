package com.onuryilmazo.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    // Kullanıcıyı kayıt ederken şifreyi hash'ler
    public User registerUser(String username, String rawPassword) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Kullanıcı adı zaten mevcut!");
        }
        String hashedPassword = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword); // Hashlenmiş şifreyi kaydet

        return userRepository.save(user);
    }

    // Kullanıcı giriş işlemi
    public boolean authenticateUser(String username, String rawPassword) {
        // Kullanıcıyı veritabanından bul
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return false; // Kullanıcı bulunamazsa giriş başarısız
        }

        // Girilen şifre ile veritabanındaki hashlenmiş şifreyi karşılaştır
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }
}
