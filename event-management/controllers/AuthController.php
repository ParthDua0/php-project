<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Admin.php';
require_once __DIR__ . '/../utils/response.php';

class AuthController {

    // 🔥 COMMON SESSION CONFIG (reuse everywhere)
    private function startSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_set_cookie_params([
                'lifetime' => 0,
                'path' => '/',
                'domain' => 'localhost',
                'secure' => false,      // true only if HTTPS
                'httponly' => true,
                'samesite' => 'Lax'     // 🔥 IMPORTANT for your setup
            ]);

            session_start();
        }
    }

    // 🔐 LOGIN
    public function login() {
        $this->startSession();

        $db = (new Database())->connect();
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || !isset($data->username, $data->password)) {
            jsonResponse(["error" => "Invalid input"], 400);
        }

        $admin = Admin::findByUsername($db, $data->username);

        if ($admin && password_verify($data->password, $admin['password'])) {
            $_SESSION['admin'] = $admin['id'];

            jsonResponse([
                "success" => true,
                "message" => "Login successful"
            ]);
        } else {
            jsonResponse(["error" => "Invalid credentials"], 401);
        }
    }

    // 🔍 CHECK SESSION
    public function checkSession() {
        $this->startSession();

        if (isset($_SESSION['admin'])) {
            jsonResponse([
                "success" => true,
                "loggedIn" => true
            ]);
        } else {
            jsonResponse([
                "success" => false,
                "loggedIn" => false
            ], 401);
        }
    }

    // 🚪 LOGOUT
    public function logout() {
        $this->startSession();

        // unset all session variables
        $_SESSION = [];

        // destroy session
        session_destroy();

        // 🔥 delete session cookie manually
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();

            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        jsonResponse([
            "success" => true,
            "message" => "Logged out"
        ]);
    }
}