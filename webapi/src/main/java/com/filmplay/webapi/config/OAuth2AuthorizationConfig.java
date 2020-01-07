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

package com.filmplay.webapi.config;

import org.springframework.boot.autoconfigure.security.oauth2.authserver.AuthorizationServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
@EnableAuthorizationServer
@EnableConfigurationProperties({AuthorizationServerProperties.class})
public class OAuth2AuthorizationConfig extends AuthorizationServerConfigurerAdapter {

    private final AuthenticationManager authenticationManager;
    private final TokenStore tokenStore;

    public OAuth2AuthorizationConfig(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.tokenStore = new InMemoryTokenStore();
    }

    @Primary
    @Bean
    public DefaultTokenServices tokenServices() {
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setTokenStore(this.tokenStore);
        tokenServices.setSupportRefreshToken(true);
        tokenServices.setAccessTokenValiditySeconds(86400);
        return tokenServices;
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        int expire = -1;
        clients.inMemory()
                .withClient("pwa_app_client")
                .secret("17C8EEC8C70597D34F4A988B07217457EA36691F52DA45D14295B804EE65AAB0").authorizedGrantTypes("password", "client_credentials", "refresh_token", "implicit").scopes("read", "write").accessTokenValiditySeconds(expire).authorities("ROLE_APP_CLIENT").autoApprove(true);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints.authenticationManager(authenticationManager).tokenStore(tokenStore);
    }

}
