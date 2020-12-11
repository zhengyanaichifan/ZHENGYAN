<?php

// 接受参数
$one = $_GET['cat_one'];
$two = $_GET['cat_two'];
$three = $_GET['cat_three'];
$pagesize = $_GET['pagesize'];

$link = mysqli_connect('localhost', 'root', 'root', 'mi');
$sql = "SELECT * FROM `goods`";
if ($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
if ($two != 'all') $sql .= " AND `cat_two_id`='$two'";
if ($three != 'all') $sql .= " AND `cat_three_id`='$three'";

$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);


// 返回数据给前端
$total = ceil(count($data) / $pagesize);

echo json_encode(array(
    "message" => "获取总页数成功",
    "code" => 1,
    "total" => $total,
    "sql" => $sql
));

?>