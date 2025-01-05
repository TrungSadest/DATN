package com.be.service.impl;

import com.be.config.jwt.JwtUtil;
import com.be.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
@Service
public class CommonServiceImpl implements CommonService {
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public String getUserId() throws Exception {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        String accessToken = jwtUtil.parseJwt(request);
        return jwtUtil.getUserUidFromJwtToken(accessToken);

    }
}