package com.overzealouspelican.foodinventory.exception.handler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.overzealouspelican.foodinventory.exception.InventoryKeyExistsException;
import com.overzealouspelican.foodinventory.model.Violation;
import com.overzealouspelican.foodinventory.response.ValidationErrorResponse;

@ControllerAdvice
public class ValidationExceptionHandler {
  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  ValidationErrorResponse onConstraintValidationException(ConstraintViolationException e) {
      ValidationErrorResponse error = new ValidationErrorResponse();
      for (ConstraintViolation<?> violation : e.getConstraintViolations()) {
        error.getViolations().add(new Violation(violation.getPropertyPath().toString(), violation.getMessage()));
      }
      return error;
  }
 
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  ValidationErrorResponse onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    ValidationErrorResponse error = new ValidationErrorResponse();
    for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
      error.getViolations().add(new Violation(fieldError.getField(), fieldError.getDefaultMessage()));
    }
    return error;
  }

  @ExceptionHandler(InventoryKeyExistsException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  ValidationErrorResponse onInventoryKeyExistsException(InventoryKeyExistsException e) {
    ValidationErrorResponse error = new ValidationErrorResponse();
    error.getViolations().add(new Violation("inventoryKey", "This inventory key already exists"));
    return error;
  }
}
