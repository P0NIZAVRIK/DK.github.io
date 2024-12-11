<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'], $data['nomination'], $data['reason'])) {
        $results = [];
        $file = 'results.json';
        
        if (file_exists($file)) {
            $results = json_decode(file_get_contents($file), true);
        }

        $results[] = $data;
        file_put_contents($file, json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
    }
}
