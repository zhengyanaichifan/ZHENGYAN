<?php

// 接受一级分类
$one = $_GET['cat_one'];
$two = $_GET['cat_two'];

$link = mysqli_connect('localhost', 'root', 'root', 'mi');
$sql = "SELECT `cat_three_id` FROM `goods` WHERE `cat_one_id`='$one' AND `cat_two_id`='$two' GROUP BY `cat_three_id`";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);

// 返回结果给前端
echo json_encode(array(
    "message" => "请求三级列表数据成功",
    "code" => 1,
    "list" => $data
));


?>