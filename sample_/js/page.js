$(function(){
	
	$('.js-calculator').each(function(){
		//合計値の初期値
		var total = 0;
		
		//画面の数字の部分の要素
		var $displayNum = $('.js-calculator_display_num');
		//数字のボタンの要素
		var $numTrigger = $('.js-calculator_num_btn').find('a');
		
		var numFlag=false;
		//イコールが押されたかのフラグ
		var equalFlag=false;
		
		//数字のボタンをクリックしたら
		$numTrigger.on('click',function(e){
			e.preventDefault();//←これブラウザデフォルトの機能を無効にするやつ
			//ボタンの数字の文字を変数に
			var num = $(this).find('span').html();
			//画面の数字の部分の要素の中身を取得して入れ替える。
			if(!opFlag){
				if(!equalFlag){
					$displayNum.html($displayNum.html()+num);
				}else{
					$displayOp.html('');
					$displayNum.html(num);
					equalFlag=false;
				}
			}else{
				if(!numFlag){
					$displayNum.html(num);
					numFlag=true;
				}else{
					$displayNum.html($displayNum.html()+num);
				}
			}
		});
		
		//画面の＋-*/=の部分の要素
		var $displayOp = $('.js-calculator_display_op');
		//＋-*/=のボタンの要素
		var $opTrigger = $('.js-calculator_operation_btn').find('a');
		//＋-*/=
		var opTypeFlag;
		//＋-*/=が何回押されたか
		var opFlag = 0;
		
		//＋-*/=のボタンをクリックしたら
		$opTrigger.on('click',function(e){
			e.preventDefault();
			
			numFlag=false;

			var op = $(this).find('span').html();
			$displayOp.html(op);
			
			//合計数値が空だった場合
			if(!$displayNum.html().length){
				$displayOp.html('');
				return false;
			}
			
			//クリア押された場合
			if($(this).hasClass('clear')){
				//色々初期化
				$displayNum.html('');
				total = 0;
				opFlag = 0;
				opTypeFlag='';
				//Cの表示消す
				setTimeout(function(){
					$displayOp.html('');
				}, 500);
				return false;
			}else if($(this).hasClass('equal')){//イコールが押された場合
				if(opTypeFlag){
					var num = $displayNum.html();
					//一時保存した合計値の文字列と現状画面に入力している文字列を演算するために数値型で処理
					if(opTypeFlag=='plus'){
						total = Number(total)+Number(num);
					}else if(opTypeFlag=='minus'){
						total = Number(total)-Number(num);
					}else if(opTypeFlag=='multiply'){
						total = Number(total)*Number(num);
					}else if(opTypeFlag=='division'){
						total = Number(total)/Number(num);
					}
					$displayNum.html(total);
					opFlag = 0;
					opTypeFlag='';
				}
					equalFlag=true;
				
			}else{//それ以外の処理
				opFlag++;
				
				if(opFlag<=1){
					total=$displayNum.html();
				}else{
					num=$displayNum.html();
					if(opTypeFlag=='plus'){
						total = Number(total)+Number(num);
					}else if(opTypeFlag=='minus'){
						total = Number(total)-Number(num);
					}else if(opTypeFlag=='multiply'){
						total = Number(total)*Number(num);
					}else if(opTypeFlag=='division'){
						total = Number(total)/Number(num);
					}
					$displayNum.html(total);
				}
				
				if($(this).hasClass('plus')){
					opTypeFlag='plus';
				}else if($(this).hasClass('minus')){
					opTypeFlag='minus';
				}else if($(this).hasClass('multiply')){
					opTypeFlag='multiply';
				}else if($(this).hasClass('division')){
					opTypeFlag='division';
				}

			}
		});
	});
});
