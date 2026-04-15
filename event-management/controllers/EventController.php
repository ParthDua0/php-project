<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Event.php';
require_once __DIR__ . '/../utils/response.php';

class EventController {

    public function getAllEvents() {
        $db = (new Database())->connect();
        $events = Event::getAll($db);

        jsonResponse($events);
    }

    public function createEvent() {
        $db = (new Database())->connect();

        $data = json_decode(file_get_contents("php://input"));

        if (!$data) {
            jsonResponse(["error" => "Invalid input"], 400);
        }

        if (
            empty($data->title) ||
            empty($data->event_date) ||
            empty($data->location) ||
            $data->total_seats <= 0
        ) {
            jsonResponse(["error" => "Invalid event data"], 400);
        }

        Event::create($db, $data);
        jsonResponse(["message" => "Event created"]);
    }

    public function updateEvent($id) {
        $db = (new Database())->connect();
        $data = json_decode(file_get_contents("php://input"));

        if (!$data) {
            jsonResponse(["error" => "Invalid input"], 400);
        }   

        Event::update($db, $id, $data);
        jsonResponse(["message" => "Event updated"]);
    }

    public function deleteEvent($id) {
        $db = (new Database())->connect();

        Event::delete($db, $id);
        jsonResponse(["message" => "Event deleted"]);
    }
    
}