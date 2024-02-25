<?php 

$todaydate = date("Y-m-d G:i:s");
$yesterdaydate = date("Y-m-d", strtotime("-365 days"));
$start=" 00:00:00";
$last720daysdate = date("Y-m-d", strtotime("-730 days"));
echo $last720daysdate;

// echo"". $todaydate ."". $yesterdaydate .$start;
// echo "".$todaydate."";
?>