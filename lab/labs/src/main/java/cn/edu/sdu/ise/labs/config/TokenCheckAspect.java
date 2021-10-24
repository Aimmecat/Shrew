package cn.edu.sdu.ise.labs.config;

import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.lang.reflect.Method;

/**
 * 描述：对API接口的请求，进行token验证
 *
 * @author lihongwen
 * @date 2020/3/9
 */
@Component
@Aspect
@Slf4j
public class TokenCheckAspect {
    private void check() {
    }

    @Before("execution(* cn.edu.sdu.ise.labs.controller..*Controller.*(..))")
    public void processLog(JoinPoint joinPoint) throws Exception {
        check();
        Class<?> clazz = joinPoint.getTarget().getClass();
        String methodName = joinPoint.getSignature().getName();
        Class<?>[] parameterTypes = ((MethodSignature) joinPoint.getSignature()).getMethod().getParameterTypes();

        Method method = clazz.getMethod(methodName, parameterTypes);
        if (method.getAnnotation(NeedNoToken.class) != null) {
            return;
        }

        Token token = TokenContextHolder.getToken();
        Assert.notNull(token, "您未登录，请重新登录");
    }
}
