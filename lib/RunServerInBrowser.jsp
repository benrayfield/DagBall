<%@ page import="java.io.*, java.util.*, javax.servlet.http.*, javax.servlet.*" %>
<%@ page contentType="application/json" %>
<%
	/*
	Doesnt work yet.
	
	
	write index.jsp that runs in tomcat that makes a browser tab running on same computer which does
	an ajax act as a server that others across internet can send json to and get a json response.
	I will boot tomcat with that jsp in it, then open browser which will ajax to
	http://localhost:8080/dagverse?func=runServerInBrowser then other computers across the internet
	can ajax post json to http://localhost:8080/dagverse and get json back. Tomcat will act as a
	proxy for my local browser tab which has the server logic. However many http requests come in
	to tomcat at http://localhost:8080/dagverse (not the func=runServerInBrowser) before the next
	post to http://localhost:8080/dagverse?func=runServerInBrowser, group them together into a json
	list of those jsons (objects all the way through, not a list of json strings) and send them
	as the response to the http://localhost:8080/dagverse?func=runServerInBrowser call. The browser
	tab that made the http://localhost:8080/dagverse?func=runServerInBrowser call, when it gets that
	from tomcat, does some logic then answers back to tomcat a json list of the same size. Tomcat
	should then split the list and send its contents (1 index each) to the waiting worker threads
	which called http://localhost:8080/dagverse . This should be a general multiplexing proxy that
	allows a browser tab to act as a server.
	*/
	
	
	
	
	// Step 1: Prevent caching
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);

    // Step 2: Initialize a variable to hold request data
    String requestData = "";
    boolean isJsonData = false;

    // Determine the type of request and extract data accordingly
    if ("GET".equalsIgnoreCase(request.getMethod())) {
        String queryString = request.getQueryString();
        if (queryString != null && (queryString.startsWith("%7B") || queryString.startsWith("%5B"))) {
            requestData = URLDecoder.decode(queryString, "UTF-8");
            isJsonData = true;
        }
    } else if ("POST".equalsIgnoreCase(request.getMethod())) {
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        requestData = sb.toString();
        if (requestData.startsWith("{") || requestData.startsWith("[")) {
            isJsonData = true;
        }
    }

    // Step 3: Process the request data
    // Example: Add JSON data to a queue or return a response based on the requestData
    if (isJsonData) {
        // If requestData is JSON, process it accordingly
        // This could involve parsing the JSON, storing it, or adding it to an application-wide queue
        
        // Example processing (pseudo-code, replace with actual logic)
        // processJsonData(requestData);

        // For demonstration, just output the requestData
        out.println(requestData);
    } else {
        // Handle non-JSON data or other request processing
        out.println("{\"message\": \"No JSON data found\"}");
    }
	
	requestQueue.add(jsonInput.toString());

	// Placeholder response until real response is ready
	synchronized (requestQueue) {
		requestQueue.wait(); // Wait for response from browser tab
	}
	// Retrieve and send the real response
	String jsonResponse = (String) application.getAttribute("jsonResponse");
	out.println(jsonResponse);
	
	
	
	
	/*
    // Set headers to ensure the response is not cached
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);

    // Initialize a variable to hold the JSON data
    String jsonData = "";

    if ("GET".equalsIgnoreCase(request.getMethod())) {
        // For GET requests, extract the JSON data from the query string
        String queryString = request.getQueryString();
        if (queryString != null && (queryString.startsWith("%7B") || queryString.startsWith("%5B"))) { // URL encoded '{' or '['
            jsonData = URLDecoder.decode(queryString, "UTF-8");
        } else {
            // Handle normal URL parameter processing
        }
    } else if ("POST".equalsIgnoreCase(request.getMethod())) {
        // For POST requests, read the JSON data from the request body
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        jsonData = sb.toString();
    }

    // At this point, jsonData contains the JSON data from GET or POST request
    // You can now process this JSON data as needed for your application

    // Example: simply output the jsonData for demonstration purposes
    //out.println(jsonData);
	
	// Simple in-memory queue for storing JSON requests
	List<String> requestQueue = (List<String>) application.getAttribute("requestQueue");
	if (requestQueue == null) {
		requestQueue = new ArrayList<>();
		application.setAttribute("requestQueue", requestQueue);
	}

	String func = request.getParameter("func");
	if ("runServerInBrowser".equals(func)) {
		// Return all queued requests as JSON array and clear the queue
		response.setContentType("application/json");
		out.println(new Gson().toJson(requestQueue));
		requestQueue.clear();
	} else {
		// Assume JSON POST, add to queue
		StringBuilder jsonInput = new StringBuilder();
		String line;
		BufferedReader reader = request.getReader();
		while ((line = reader.readLine()) != null) {
			jsonInput.append(line);
		}
		requestQueue.add(jsonInput.toString());

		// Placeholder response until real response is ready
		synchronized (requestQueue) {
			requestQueue.wait(); // Wait for response from browser tab
		}
		// Retrieve and send the real response
		String jsonResponse = (String) application.getAttribute("jsonResponse");
		out.println(jsonResponse);
	}
	*/
%>
