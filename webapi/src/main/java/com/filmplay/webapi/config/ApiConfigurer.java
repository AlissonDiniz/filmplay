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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class ApiConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiConfigurer.class);

    private final ApplicationProperties defaultProperties;

    public ApiConfigurer(ApplicationProperties defaultProperties) {
        this.defaultProperties = defaultProperties;
    }

    @Bean
    public FilterRegistrationBean registerCorsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = defaultProperties.getCorsConfiguration();
        if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
            LOGGER.debug("Registering CORS filter");
            source.registerCorsConfiguration("/**", config);
        }
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
