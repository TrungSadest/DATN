package com.be.controller;

import com.be.config.jwt.JwtUtil;
import com.be.config.jwt.MyUserDetailsService;
import com.be.constant.Constants;
import com.be.entity.Roles;
import com.be.entity.Users;
import com.be.model.ResponseData;
import com.be.model.request.LoginRequest;
import com.be.model.request.RegisterRequest;
import com.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<ResponseData> login(@RequestBody LoginRequest loginRequest) {
        ResponseData responseData = new ResponseData();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        }catch (BadCredentialsException e) {
            responseData.setMessage("Bad credentials");
            responseData.setStatus(false);
            responseData.setMsgCode(Constants.BAD_CREDENTIALS);
            return ResponseEntity.ok(responseData);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        responseData.setResponseData(jwt);
        responseData.setStatus(true);
        responseData.setMsgCode(Constants.LOGIN_SUCCESS);
        return ResponseEntity.ok(responseData);
    }


    @PostMapping("/register")
    public ResponseEntity<ResponseData> register(@Valid @RequestBody RegisterRequest registerRequest) {
       ResponseData responseData = new ResponseData();
       try {
           // Kiểm tra username và email đã tồn tại
           if(userRepository.existsByUsername(registerRequest.getUsername())) {
               responseData.setStatus(false);
               responseData.setMsgCode(Constants.USERNAME_IS_EXIST);
               return ResponseEntity.ok(responseData);
           }
           if(userRepository.existsByEmail(registerRequest.getEmail())) {
               responseData.setStatus(false);
               responseData.setMsgCode(Constants.EMAIL_IS_EXIST);
               return ResponseEntity.ok(responseData);
           }

           Users newUser = new Users();
           newUser.setUsername(registerRequest.getUsername());
           newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
           newUser.setEmail(registerRequest.getEmail());
           newUser.setFullName(registerRequest.getFullName());
           newUser.setPhoneNumber(registerRequest.getPhoneNumber());
           newUser.setAddress(registerRequest.getAddress());
           newUser.setCreatedDate(new Date());
           newUser.setIsDel(false);
           newUser.setRole(new Roles(Constants.ROLE_R003));
           userRepository.save(newUser);

           responseData.setStatus(true);
           responseData.setMsgCode(Constants.REGISTER_SUCCESS);
       }catch (Exception e) {
           e.printStackTrace();
           responseData.setStatus(false);
           responseData.setMsgCode(Constants.REGISTER_FAILED);
       }
       return ResponseEntity.ok(responseData);
    }
}
