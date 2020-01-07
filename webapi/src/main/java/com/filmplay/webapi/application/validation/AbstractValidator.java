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
package com.filmplay.webapi.application.validation;

import com.filmplay.webapi.application.exception.ConstraintViolationDataException;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

public abstract class AbstractValidator<T> {

    protected final T dto;
    protected final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public AbstractValidator(T dto) {
        this.dto = dto;
    }

    public void validate() throws ConstraintViolationDataException {
        Set<ConstraintViolation<T>> violations = validator.validate(dto);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationDataException(violations);
        }
    }
}
