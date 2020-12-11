<?php
// 接受前端传来的数据
$one = $_GET['cat_one'];
$two = $_GET['cat_two'];
$three = $_GET['cat_three'];
$method = $_GET['sort_method'];
$type = $_GET['sort_type'];
$current = $_GET['current'];
$pagesize = $_GET['pagesize'];

$sql = "SELECT * FROM `goods`";
  // 添加筛选条件
if ($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
if ($two != 'all') $sql .= " AND `cat_two_id`='$two'";
if ($three != 'all') $sql .= " AND `cat_three_id`='$three'";
  // 确定排序方式
if ($method == '综合') $sql .= " ORDER BY `goods_id` $type";
if ($method == '价格') $sql .= " ORDER BY `goods_price` $type";

$start = ($current - 1) * $pagesize;
$sql .= " LIMIT $start, $pagesize";

  // 3. 操作数据库进行查询
$link = mysqli_connect('localhost', 'root', 'root', 'mi');
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);

// 结果反馈给前端

echo json_encode(array(
    "message" => "获取商品列表成功",
    "current" => $current,
    "code" => 1,
    "list" => $data,
    "sql" => $sql
));

?>