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
package com.filmplay.webapi.application.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@EqualsAndHashCode(callSuper = true, of = {})
@ToString(callSuper = true, of = {})
@EntityListeners(AuditingEntityListener.class)
public class Movie extends AbstractDomain {

    private static final long serialVersionUID = -1855848587808316115L;

    @NotNull
    private String title;

    @Column(columnDefinition = "longtext")
    protected String description;
    
    @NotNull
    private Integer minutes;
    
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
}
