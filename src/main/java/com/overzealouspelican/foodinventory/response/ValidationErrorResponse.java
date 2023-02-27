package com.overzealouspelican.foodinventory.response;

import java.util.ArrayList;
import java.util.List;

import com.overzealouspelican.foodinventory.model.Violation;

public class ValidationErrorResponse {
    private List<Violation> violations = new ArrayList<>();
 
    public List<Violation> getViolations() {
        return violations;
    }
    
    public void setViolations(List<Violation> violations) {
        this.violations = violations;
    }
}
