package cn.edu.sdu.ise.labs.config;

import cn.edu.sdu.ise.labs.model.ResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * @author 李洪文
 * @description
 * @date 2019/11/18 18:11
 */
@ControllerAdvice
@Slf4j
public class MyControllerAdvice implements ResponseBodyAdvice<Object> {
    /**
     * @param ex 异常信息
     * @return json格式出错信息
     */
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public ResponseData myExceptionHandler(Exception ex) {
        Throwable cause = ex;
        while (cause.getCause() != null) {
            cause = cause.getCause();
        }

        ResponseData responseData = new ResponseData();

        if (DataAccessException.class.isAssignableFrom(ex.getClass())) {
            log.error("SQL Error", ex);
        } else {
            log.debug("Error:", ex);
        }

        responseData.setCode(1000);
        responseData.setSuccess(false);
        if (!StringUtils.hasText(cause.getMessage())) {
            responseData.setMessage(cause.toString());
        } else {
            responseData.setMessage(cause.getMessage());
        }

        return responseData;
    }

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> aClass) {
        return !returnType.getMethod().getReturnType().isAssignableFrom(Void.TYPE);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest request, ServerHttpResponse serverHttpResponse) {
        String path = request.getURI().getPath();
        if (body instanceof ResponseData) {
            return body;
        } else if (path.contains("/swagger") || path.contains("/v2/api-docs")) {
            return body;
        } else {
            ResponseData<Object> resp = new ResponseData();
            resp.setCode(200);
            resp.setData(body);
            resp.setSuccess(true);
            return resp;
        }
    }
}
