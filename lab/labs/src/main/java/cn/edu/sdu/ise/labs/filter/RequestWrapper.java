package cn.edu.sdu.ise.labs.filter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * @author 李洪文
 * @description
 * @date 2019/12/12 15:32
 */
public class RequestWrapper extends HttpServletRequestWrapper {
    private String accessToken;

    @SuppressWarnings("all")
    public RequestWrapper(HttpServletRequest request) {
        super(request);

        // 处理令牌
        accessToken = request.getHeader("accessToken");
        if (accessToken == null) {
            accessToken = "";
        }

        if (!accessToken.isEmpty()) {
            return;
        }

        accessToken = getCookie("accessToken");
        if (accessToken == null) {
            accessToken = "";
        }

        if (!accessToken.isEmpty()) {
            return;
        }
    }

    private String getCookie(String cookieName) {
        Cookie[] cookies = getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
