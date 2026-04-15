<?php

//START SESSION FIRST (important)
session_start();

//CORS HEADERS (must match frontend exactly)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//HANDLE PREFLIGHT REQUEST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//RESPONSE TYPE
header("Content-Type: application/json");

//ROUTES
require_once __DIR__ . '/routes/api.php';