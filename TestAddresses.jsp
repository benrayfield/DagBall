<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Server Public IP Address</title>
</head>
<body>
    <h1>Server Public IP Address</h1>
    <%
    String publicIpAddress = request.getHeader("X-Forwarded-For");
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("Proxy-Client-IP");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("WL-Proxy-Client-IP");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_X_FORWARDED");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_X_CLUSTER_CLIENT_IP");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_CLIENT_IP");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_FORWARDED_FOR");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_FORWARDED");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("HTTP_VIA");
    }
    if (publicIpAddress == null || publicIpAddress.isEmpty() || "unknown".equalsIgnoreCase(publicIpAddress)) {
        publicIpAddress = request.getHeader("REMOTE_ADDR");
    }
    %>
    <p>The public IP address of the server is: <%= publicIpAddress %></p>
    <%
    java.util.Enumeration<String> headerNames = request.getHeaderNames();
    java.util.Map<String, String> headers = new java.util.HashMap();
    while (headerNames.hasMoreElements()) {
        String headerName = headerNames.nextElement();
        String headerValue = request.getHeader(headerName);
        headers.put(headerName, headerValue);
    }
    out.println("headers="+headers);
	%>
</body>
</html>