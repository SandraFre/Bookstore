package com.example.bookstore_api.security.service;

import com.example.bookstore_api.entity.Role;
import com.example.bookstore_api.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;

@Service
public class JwtService {
    private final long tokenValidationTimeMs;
    private final byte[] secretKey;

    public JwtService(@Value("${security.jwt.secret.key}") byte[] secretKey,
                      @Value("#{${security.jwt.valid.token.min}*60000}") long tokenValidationTimeMs) {
        this.secretKey = secretKey;
        this.tokenValidationTimeMs = tokenValidationTimeMs;
    }

    public String getToken(User user){
        Date date = new Date();

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuer("bookstore_api")
                .setAudience("bookstore_ui")
                .setSubject(user.getUsername())
                .setExpiration(new Date(date.getTime() + tokenValidationTimeMs))
                .setIssuedAt(date)
                .claim("roles", user.getRoles().stream().map(Role::getAuthority).toList())
                .signWith(Keys.hmacShaKeyFor(secretKey), SignatureAlgorithm.HS512)
                .compact();
    }

    public Authentication parseToken(String token) {

        try {
            JwtParser jwtParser = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build();
            Claims body = jwtParser.parseClaimsJws(token).getBody();
            String userName = body.getSubject();

            List<SimpleGrantedAuthority> roles = ((List<String>) body.get("roles")).stream().map(SimpleGrantedAuthority::new).toList();

            return new UsernamePasswordAuthenticationToken(userName, null, roles);
        } catch (Exception e) {
            throw new BadCredentialsException("Cannot parse token", e);
        }
    }
}
