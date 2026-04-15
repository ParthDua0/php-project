<?php
class Event {

    public static function getAll($db) {
        $stmt = $db->query("SELECT * FROM events ORDER BY event_date ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($db, $data) {
        $stmt = $db->prepare("
            INSERT INTO events (title, description, category, event_date, location, total_seats)
            VALUES (?, ?, ?, ?, ?, ?)
        ");

        return $stmt->execute([
            $data->title,
            $data->description,
            $data->category,
            $data->event_date,
            $data->location,
            $data->total_seats
        ]);
    }

    public static function update($db, $id, $data) {
        $stmt = $db->prepare("
            UPDATE events 
            SET title=?, description=?, category=?, event_date=?, location=?, total_seats=?
            WHERE id=?
        ");

        return $stmt->execute([
            $data->title,
            $data->description,
            $data->category,
            $data->event_date,
            $data->location,
            $data->total_seats,
            $id
        ]); 
    }

    public static function delete($db, $id) {
        $stmt = $db->prepare("DELETE FROM events WHERE id = ?");
        return $stmt->execute([$id]);
    }
}