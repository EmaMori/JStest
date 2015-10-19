$(function(){
	//.js-calculatorが出てくるごとに実行
	$('.js-calculator').each(function(){
		
		//合計数値を格納
		var total = 0;
		
		//画面の表示オブジェクト（$で始まるのはjQueryオブジェクトを参照していることを示すため）
		var $displayNum = $('.js-calculator_display_num');

		//数字キーのオブジェクト変数
		var $numTrigger = $('.js-calculator_num_btn').find('button');
		
		//演算中に表示されない数値を一旦退避させるためのフラグ
		var numFlag = false;
		
		//イコールを押されたフラグ
		var equalFlag = false;

		//演算キーを何回押したかカウントするフラグ
		var opFlag = 0;
		
		//画面の+-*/=の部分の表示オブジェクト
		var $displayOp = $('.js-calculator_display_op');

		//演算キーのオブジェクト変数
		var $opTrigger = $('.js-calculator_operation_btn').find('button');

		//+-*/=の種別
		var opTypeFlag;
		
		//小数点.が押された場合
		var dotFlag = false;
		
		//$numTriggerがクリックされた時にイベント発動
		$numTrigger.on('click',function(e){
			e.preventDefault();//ブラウザデフォルトの機能を無効にする。たとえばaタグの場合遷移しなくなる。
			//ボタン($displayNum自身＝this)の数字の文字(.html())を変数numに代入する。
			var num = $(this).html();

			//画面の数字の部分の要素の中身を取得して入れ替える。
			if(!opFlag){//いずれの演算キーも押されていない状態（opFlag==0）のとき
				if(!equalFlag){//イコールを押されていないとき
					//.が先頭に入力されたりダブったりしないよう処理
					if(num!='.'){
						$displayNum.html($displayNum.html()+num);//画面HTMLに数字キーの数字を文字列結合する
					}else if(!dotFlag && $displayNum.html()!=''){
						$displayNum.html($displayNum.html()+num);//画面HTMLに.を文字列結合する
						dotFlag = true;
					}
				}else{//イコールを押されていたとき
					//数字をタイプするまでフラグは変わらない
					if(num!='.'){
						$displayOp.html('');//表示されている=をHTMLから削除する
						$displayNum.html('');//画面HTMLの表示を消去する
						$displayNum.html(num);//画面HTMLに数字キーの数字を表示する
						equalFlag=false;//イコールフラグをリセットする
					}else{
						return false;
					}
				}
			}else{//演算キーが押された状態のとき
				if(!numFlag){//演算表示用フラグが立っていない場合
					if(num!='.'){
						console.log(num);
						$displayNum.html(num);//画面HTMLに数字キーの数字を表示する
						numFlag=true;//演算表示用フラグを立てる
					}else{
						return false;
					}
				}else{//演算表示用フラグが立っている場合
					//.が先頭に入力されたりダブったりしないよう処理
					if(num!='.'){
						$displayNum.html($displayNum.html()+num);//画面HTMLに数字キーの数字を文字列結合する
					}else if(!dotFlag && $displayNum.html()!=''){
						$displayNum.html($displayNum.html()+num);//画面HTMLに.を文字列結合する
						dotFlag = true;
					}
				}
			}
		});
		
		//$opTriggerがクリックされた時にイベント発動
		$opTrigger.on('click',function(e){
			e.preventDefault();
			
			numFlag=false;
			dotFlag = false;

			var op = $(this).html();
			$displayOp.html(op);
			
			//画面に何も表示されていない場合は何もしない
			if(!$displayNum.html().length){
				$displayOp.html('');
				return false;
			}
			
			//クリアが押された場合
			if($(this).hasClass('clear')){
				//色々初期化
				$displayNum.html('');
				total = 0;
				opFlag = 0;
				opTypeFlag='';
				dotFlag = false;
				//0.5秒後にCの表示消す
				setTimeout(function(){
					$displayOp.html('');
				}, 500);
				return false;//イベントの戻り値を偽(false)にすることで、上記より下の処理内容をデフォルト処理含め空にすることができる。
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
