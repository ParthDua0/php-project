<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Notice.php';
require_once __DIR__ . '/../utils/response.php';

class NoticeController {

    // GET all notices
    public function getNotices() {
        $db = (new Database())->connect();
        $notices = Notice::getAll($db);
        jsonResponse($notices);
    }

    // CREATE notice
    public function createNotice() {
        $db = (new Database())->connect();
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || empty($data->title)) {
            jsonResponse(["error" => "Invalid input"], 400);
        }

        Notice::create($db, $data->title);

        jsonResponse([
            "success" => true,
            "message" => "Notice added"
        ]);
    }

    // UPDATE notice
    public function updateNotice($id) {
        $db = (new Database())->connect();
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || empty($data->title)) {
            jsonResponse(["error" => "Invalid input"], 400);
        }

        Notice::update($db, $id, $data->title);

        jsonResponse([
            "success" => true,
            "message" => "Notice updated"
        ]);
    }

    // DELETE notice
    public function deleteNotice($id) {
        $db = (new Database())->connect();

        Notice::delete($db, $id);

        jsonResponse([
            "success" => true,
            "message" => "Notice deleted"
        ]);
    }
}