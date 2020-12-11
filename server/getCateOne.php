<?php
// 查询数据库，找到有多少种分类

$link = mysqli_connect('localhost', 'root', 'root', 'mi');
$sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);

// 返回结果给前端
echo json_encode(array(
    "message" => "获取一级列表成功",
    "code" => 1,
    "list" => $data
));


?>