<?php
$base = $_REQUEST['cible'];

/*$fil = 'xyz.txt';
$f = @file_get_contents($fil);
$f = preg_replace('#[\r\n\s]#', '|', $f);
$f = str_replace('|||','|',$f);
$f = str_replace('||','|',$f);

$fs = explode('|', $f);
$db = array();
for($i=0; $i<count($fs); $i++){
	if(!in_array($fs[$i],$db))
		$db[] = $fs[$i];
}
file_put_contents('wdlst.txt', implode('|', $db));
$ret = '';

foreach ($db as $cible) {*/
$stc = array();
$stc[100] = "Continue";
$stc[101] = "Switching Protocols";
$stc[200] = 'OK !';
$stc[201] = "Created";
$stc[202] = "Accepted";
$stc[203] = "Non-Authoritative Information";
$stc[204] = "No Content";
$stc[205] = "Reset Content";
$stc[206] = "Partial Content";
$stc[300] = "Multiple Choices";
$stc[301] = "Move Permanently";
$stc[302] = "Found";
$stc[303] = "See Other";
$stc[304] = "Not Modified";
$stc[305] = "Use Proxy";
$stc[306] = "(Unused)";
$stc[307] = "Temporary Redirect";
$stc[400] = "Bad Request";
$stc[401] = "Unauthorized";
$stc[402] = "Payment Required";
$stc[403] = "Forbiden";
$stc[404] = "Not Found";
$stc[405] = "Method Not Allowed";
$stc[406] = "Not Acceptable";
$stc[407] = "Proxy Authentification Required";
$stc[408] = "Request Timeout";
$stc[409] = "Conflict";
$stc[410] = "Gone";
$stc[411] = "Length Required";
$stc[412] = "Precondition Failed";
$stc[413] = "Request Entity Too Large";
$stc[414] = "Request-URI Too Long";
$stc[415] = "Unsupported Media Type";
$stc[416] = "Requested Range Not Satisfiable";
$stc[417] = "Expectation Failed";
$stc[500] = "Internal Server Error";
$stc[501] = "Not Implemented";
$stc[502] = "Bad Gateway";
$stc[503] = "Service Unavailable";
$stc[504] = "Gateway Timeout";
$stc[505] = "HTTP Version Not Supported";
$stc[0] = "Request Failed, Not Submitted";
$url = $base;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HEADER, true);    // we want headers
curl_setopt($ch, CURLOPT_NOBODY, true);    // we don't need body
$rt = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
$httpcode = intval($httpcode);
$stext = $stc[$httpcode];

$ret = '{"statut":"'.$httpcode.'","url":"'.$base.'","xplic":"'.$stext.'"}'; 
echo $ret;


/*
$ch = curl_init();

$info = curl_getinfo($ch);
echo $info["http_code"];


$url = 'http://www.example.com';
$ch = curl_init($url);
c
echo 'HTTP code: ' . $httpcode;
*/