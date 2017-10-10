<?php

	require_once('utils.php');

	//	xor'ing $a against $b should produce 746865206b696420646f6e277420706c6179

	$a = hex2bin('1c0111001f010100061a024b53535009181c');
	$b = hex2bin('686974207468652062756c6c277320657965');

	echo bin2hex($crypto->fixed_xor($a, $b));
