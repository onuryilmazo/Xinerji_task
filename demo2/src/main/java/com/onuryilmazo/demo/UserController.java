package com.onuryilmazo.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; // Inject JwtUtil

    // Kayıt endpoint'i
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticateUser(user.getUsername(), user.getPassword());
        
        if (isAuthenticated) {
            String token = jwtUtil.generateToken(user.getUsername()); // Token burada üretiliyor
            System.out.println("JWT Token Üretildi: " + token);  // Log ekleyerek kontrol et
            return ResponseEntity.ok(token);  // Token'ı geri döndür
        } else {
            System.out.println("Giriş başarısız: " + user.getUsername());  // Başarısız giriş için log ekle
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

}
