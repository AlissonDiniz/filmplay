/*
 * Copyright 2020 Alisson Narjario Queiroga Diniz.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.filmplay.webapi.security;

import com.filmplay.webapi.application.domain.SecurityUser;
import com.filmplay.webapi.application.repository.SecurityUserRepository;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private static final String ROLE_APP_CLIENT_KEY = "ROLE_APP_CLIENT";
    private static final String BAD_CREDENTIAL_EXCEPTION = "BAD_CREDENTIAL_EXCEPTION";
    private static final String USER_DISABLED_EXCEPTION = "USER_DISABLED_EXCEPTION";

    private final PasswordEncoder passwordEncoder;
    private final SecurityUserRepository securityUserRepository;

    public CustomAuthenticationProvider(PasswordEncoder passwordEncoder, SecurityUserRepository securityUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.securityUserRepository = securityUserRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Optional<? extends GrantedAuthority> optional = securityContext.getAuthentication().getAuthorities().stream().filter(it -> it.getAuthority().contains(ROLE_APP_CLIENT_KEY)).findFirst();
        if(!optional.isPresent()) {
            throw new BadCredentialsException(BAD_CREDENTIAL_EXCEPTION);
        }
        
        String email = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();
        
        SecurityUser securityUser = this.securityUserRepository.findByUsername(email);
        if (securityUser == null) {
            throw new BadCredentialsException(BAD_CREDENTIAL_EXCEPTION);
        }
        if (!passwordEncoder.matches(password, securityUser.getPassword())) {
            throw new BadCredentialsException(BAD_CREDENTIAL_EXCEPTION);
        }
        if (!securityUser.getEnabled()) {
            throw new DisabledException(USER_DISABLED_EXCEPTION);
        }
        
        List<GrantedAuthority> authorities = new LinkedList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_PERSON_USER"));
        
        Authentication auth = new UsernamePasswordAuthenticationToken(email, password, authorities);
        return auth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
    
}
