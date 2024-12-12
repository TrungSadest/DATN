package com.shonline.model.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataResponse {
    private String message;
    private boolean status;
    private String statusCode;
    private Object data;
}
