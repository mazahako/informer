<?php
$w = $_GET['w'];
$h = $_GET['h'];
$bgColor = $_GET['bgColor'];
$type = $_GET['type'];
$withPicture = $_GET['withPicture'];
$lang = $_GET['lang'];
$opacity = $_GET['opacity'];
$pic = $_GET['pic'];

function returnArray()
{
    return array("1st event",
                 "2nd event",
                 "3rd event",
                 "4th event",
                 "5th event",
                 "6th event",
                 "7th event",
                 "8th event",
                 "9th event",
                 "10th event",
                 "11th event",
                 "12th event",
                 "13th event",
                 "14th event");
}

function drawInner()
{
    global $type, $im, $w, $h, $withPicture, $pic;
    $color = imageColorAllocate($im, 255, 255, 255);
    if ($withPicture == 'true') {
        $u = imagecreatefrompng($pic.'.png');
        $x = imagesx($u);
        $y = imagesy($u);
        $k1 = ($w - 10) / $x;
        $k2 = ($h - 10) / $y;
        if ($k1 > $k2) {
            $xx = round($x * $k2);
            $yy = round($y * $k2);
        } else {
            $xx = round($x * $k1);
            $yy = round($y * $k1);
        }
        imagecopyresampled($im, $u, 5, 5, 0, 0, $xx, $yy, $x, $y);
        $ww = $xx + 15;
    } else {
        $ww = $w * 0.05;
    }
    imageString($im, 5, $ww, $h * 0.2, returnArray()[substr($type, 0, 1)], $color);
    imageString($im, 5, $ww, $h * 0.6, '1', $color);
}

function drawRect()
{
    global $im, $bgColor, $w, $h, $opacity;
    if ($opacity == 'false') {
        $color = imageColorAllocate($im,
            hexdec(substr($bgColor, 0, 2)),
            hexdec(substr($bgColor, 2, 2)),
            hexdec(substr($bgColor, 4, 2)));
        imageFilledRectangle($im, 0, 0, $w - 1, $h - 1, $color);
    }
    $color = imageColorAllocate($im, 255, 255, 255);
    imageRectangle($im, 0, 0, $w - 1, $h - 1, $color);
}

function addPicture()
{
    global $im, $pic, $w, $h;
    $u = imagecreatefrompng($pic.'.png');
    $x = imagesx($u);
    $y = imagesy($u);
    $k1 = ($w - 10) / $x;
    $k2 = ($h - 30) / $y;
    if ($k1 > $k2) {
        $xx = round($x * $k2);
        $yy = round($y * $k2);
    } else {
        $xx = round($x * $k1);
        $yy = round($y * $k1);
    }
    imagecopyresampled($im, $u, 5, 15, 0, 0, $xx, $yy, $x, $y);
}

header("Content-type: image/png");

$im = imageCreate($w, $h);
drawRect();
drawInner();

imagePNG($im);
?>