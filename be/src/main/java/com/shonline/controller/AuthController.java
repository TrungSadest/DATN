package com.shonline.controller;

import com.shonline.config.jwt.JwtUtil;
import com.shonline.config.jwt.MyUserDetailsService;
import com.shonline.entity.UserRoles;
import com.shonline.entity.Users;
import com.shonline.model.auth.JwtResponse;
import com.shonline.model.auth.LoginRequest;
import com.shonline.model.auth.RegisterRequest;
import com.shonline.model.common.DataResponse;
import com.shonline.repository.UserRepository;
import com.shonline.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/auth")
public class AuthController {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRoleRepository userRoleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody LoginRequest loginRequest) throws Exception {

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Tài khoản hoặc mật khẩu sai", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(jwt));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
		// Kiểm tra username và email đã tồn tại
		if(userRepository.existsByUsername(registerRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body("Error: Username is already taken!");
		}

		if(userRepository.existsByEmail(registerRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body("Error: Email is already in use!");
		}

		// Tạo user mới và lưu vào database
		Users user = new Users();
		user.setUsername(registerRequest.getUsername());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		user.setFullName(registerRequest.getFullName());
		user.setEmail(registerRequest.getEmail());
		user.setPhoneNumber(registerRequest.getPhoneNumber());

		userRepository.save(user);

		return ResponseEntity.ok("User registered successfully!");
	}

	@GetMapping("getUserInfo")
	public ResponseEntity<DataResponse> getUserInfo() {
		DataResponse response = new DataResponse();
		try{
			Users user = userRepository.findByUsername("namtv");
			List<UserRoles> userRoles = userRoleRepository.findByUserId(user.getUserId());
			response.setData(userRoles);
		}catch (Exception e){
			e.printStackTrace();
		}
		return ResponseEntity.ok(response);
	}
}
