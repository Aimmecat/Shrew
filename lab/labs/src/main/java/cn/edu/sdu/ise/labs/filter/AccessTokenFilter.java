package cn.edu.sdu.ise.labs.filter;

import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.service.TokenService;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;

/**
 * 描述：token过滤器
 *
 * @author 李洪文
 * @date 2019-03-11
 */
@Component
public class AccessTokenFilter implements Filter {

    @Autowired
    private TokenService tokenService;

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        RequestWrapper request = new RequestWrapper((HttpServletRequest) servletRequest);
        // 处理令牌
        String accessToken = request.getAccessToken();
        Token token = null;
        if (!accessToken.isEmpty()) {
            token = tokenService.getToken(accessToken);
            if (token != null) {
                token.setLastAction(new Date());
            }
        }

        TokenContextHolder.setToken(token);
        filterChain.doFilter(request.getRequest(), servletResponse);
    }

    @Override
    public void destroy() {

    }
}
