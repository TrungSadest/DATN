package com.shonline.config.jwt;

import com.shonline.entity.UserRoles;
import com.shonline.entity.Users;
import com.shonline.repository.UserRepository;
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
@Slf4j
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
		
		log.info("Account info: "+ account.getUsername());

		List<UserRoles> userRoles = account.getRoles();

//		String role = account.getRole();
		
//		List<String> roleNames = roleDao.getRoleNames(account.getId());

		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		if (userRoles != null) {
			for (UserRoles userRole : userRoles) {
				String role = userRole.getRole().getRoleCode();
				GrantedAuthority authority = new SimpleGrantedAuthority(role);
				grantedAuthorities.add(authority);
			}
		}
		UserDetails userDetails = (UserDetails) new User(account.getUsername(), account.getPassword(),
				grantedAuthorities);
		return userDetails;
	}
}