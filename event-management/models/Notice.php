<?php
class Notice {

    public static function getAll($db) {
        $stmt = $db->query("SELECT * FROM notices ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($db, $title) {
        $stmt = $db->prepare("INSERT INTO notices (title) VALUES (?)");
        return $stmt->execute([$title]);
    }

    public static function update($db, $id, $title) {
        $stmt = $db->prepare("UPDATE notices SET title = ? WHERE id = ?");
        return $stmt->execute([$title, $id]);
    }

    public static function delete($db, $id) {
        $stmt = $db->prepare("DELETE FROM notices WHERE id = ?");
        return $stmt->execute([$id]);
    }
}