package com.onuryilmazo.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register").permitAll()  // Allow unauthenticated access to /register
                .anyRequest().authenticated()  // All other requests need authentication
            )
            .csrf(csrf -> csrf.disable());  // Disable CSRF for simplicity (if needed)
        
        return http.build();
    }
}

