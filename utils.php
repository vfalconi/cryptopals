<?php

	class Crypto
	{

		public $letter_frequency = [
			'A' => 0.0651738,
			'B' => 0.0124248,
			'C' => 0.0217339,
			'D' => 0.0349835,
			'E' => 0.1041442,
			'F' => 0.0197881,
			'G' => 0.0158610,
			'H' => 0.0492888,
			'I' => 0.0558094,
			'J' => 0.0009033,
			'K' => 0.0050529,
			'L' => 0.0331490,
			'M' => 0.0202124,
			'N' => 0.0564513,
			'O' => 0.0596302,
			'P' => 0.0137645,
			'Q' => 0.0008606,
			'R' => 0.0497563,
			'S' => 0.0515760,
			'T' => 0.0729357,
			'U' => 0.0225134,
			'V' => 0.0082903,
			'W' => 0.0171272,
			'X' => 0.0013692,
			'Y' => 0.0145984,
			'Z' => 0.0007836,
			' ' => 0.1918182
		];

		public function hex_to_base64($hex){
			$return = '';
			foreach(str_split($hex, 2) as $pair){
				$return .= chr(hexdec($pair));
			}
			return base64_encode($return);
		}


		//	-----


		public function fixed_xor($cipher, $key)
		{

			$output = '';

			for($i=0; $i<strlen($cipher); )
			{
				for($j=0; $j<strlen($key) && $i<strlen($cipher); $j++, $i++)
				{
					$output .= $cipher{$i} ^ $key{$j};
				}
			}

			return $output;

		}


		//	-----


		public function single_xor($cipher, $key)
		{
			return $this->fixed_xor($cipher, str_repeat($key, strlen($cipher)));
		}


		//	-----


		public function score_plaintext($plaintext)
		{
			$score = 0.0;
			$working_plaintext = strtoupper($plaintext);
			$chars_scored = range('A', 'Z');
			$char_count = [];
			$char_frequency = [];
			$total_chars = 0;

			$chars_scored[] = ' ';

			foreach (range('A', 'Z') as $char) {
				$char_count[$char] = 0;
				$char_frequency[$char] = 0.0;
			}

			$char_count[' '] = 0;
			$char_frequency[' '] = 0.0;

			foreach (str_split($working_plaintext) as $key => $char)
			{
				if (array_key_exists($char, $this->letter_frequency))
				{
					$char_count[$char]++;
					$total_chars++;
				}
			}

			if ($total_chars === 0)
			{
				$total_chars = 1;
			}

			foreach ($chars_scored as $char) {
				$char_frequency[$char] = ($char_count[$char] / $total_chars);
				$score += (($char_frequency[$char] - $this->letter_frequency[$char]) * ($char_frequency[$char] - $this->letter_frequency[$char])) / ($this->letter_frequency[$char]);
			}

			return $score;

		}


		//	-----


		public function findKey($cipher)
		{
			$scores = [];

			foreach (range(0, 255) as $key => $value) {
				$decrypted = $this->single_xor($cipher, chr($value));
				$score = $this->score_plaintext($decrypted);
				if ($score > 1)
				{
					$scores[chr($value)] = $score;
				}
			}

			asort($scores);

			if (bin2hex($this->single_xor($this->single_xor($cipher, array_keys($scores)[0]), array_keys($scores)[0])) === bin2hex($cipher))
			{
				return array_keys($scores)[0];
			}
			else
			{
				return null;
			}

		}


		//	-----


		public function decryptCipher($cipher)
		{
			$decoded_cipher = hex2bin($cipher);
			$key = $this->findKey($decoded_cipher);

			if ($key)
			{
				$decrypted = $this->single_xor($decoded_cipher, $key);
				return 'cipher ('.$cipher.') decrypted with key "'.$key.'" (score: '.$this->score_plaintext($decrypted).'): '.htmlentities($decrypted);
			}
			else
			{
				return 'nope, no decryption';
			}
		}


		//	-----


		public function repeating_key_xor($plaintext, $key)
		{
			$encrypted = '';
			$key = str_split($key);

			$i = 0;
			foreach (str_split($plaintext) as $char)
			{
				$encrypted .= $this->single_xor($char, $key[$i]);

				if ($i < (count($key) - 1))
				{
					$i++;
				}
				else
				{
					$i = 0;
				}
			}

			return $encrypted;

		}

	}

	$crypto = new Crypto();
