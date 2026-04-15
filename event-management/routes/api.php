<?php

require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/EventController.php';
require_once __DIR__ . '/../controllers/NoticeController.php';

$request = $_GET['route'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

$authController = new AuthController();
$eventController = new EventController();
$noticeController = new NoticeController();

//LOGIN
if ($request === "login" && $method === "POST") {
    $authController->login();
}

elseif ($request === "check-auth" && $method === "GET") {
    $authController->checkSession();
}

//LOGOUT
elseif ($request === "logout" && $method === "POST") {
    $authController->logout();
}

//EVENTS
elseif ($request === "events" && $method === "GET") {
    $eventController->getAllEvents();
}

elseif ($request === "events" && $method === "POST") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $eventController->createEvent();
}

elseif (preg_match("/events\/(\d+)/", $request, $matches) && $method == "PUT") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $eventController->updateEvent($matches[1]);
}

elseif (preg_match("/events\/(\d+)/", $request, $matches) && $method === "DELETE") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $eventController->deleteEvent($matches[1]);
}

//NOTICES
elseif ($request === "notices" && $method === "GET") {
    $noticeController->getNotices();
}

elseif ($request === "notices" && $method === "POST") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $noticeController->createNotice();
}

elseif (preg_match("/notices\/(\d+)/", $request, $matches) && $method === "PUT") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $noticeController->updateNotice($matches[1]);
}

elseif (preg_match("/notices\/(\d+)/", $request, $matches) && $method === "DELETE") {
    require __DIR__ . '/../middleware/authMiddleware.php';
    $noticeController->deleteNotice($matches[1]);
}

else {
    http_response_code(404);
    echo json_encode(["error" => "Route not found"]);
}