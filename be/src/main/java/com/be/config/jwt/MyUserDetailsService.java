package com.be.config.jwt;

import com.be.entity.Users;
import com.be.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users account = userRepository.findByUsername(username);

		if (account == null) {
			System.out.println("account not found! " + username);
			throw new UsernameNotFoundException("Account " + username + " was not found in the database");
		}
		
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

		GrantedAuthority authority = new SimpleGrantedAuthority(account.getRole().getRoleCode());
				grantedAuthorities.add(authority);
		UserDetails userDetails = (UserDetails) new User(account.getUsername(), account.getPassword(),
				grantedAuthorities);
		return userDetails;
	}
}