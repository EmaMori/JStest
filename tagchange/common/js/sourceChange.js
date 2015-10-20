$(function(){
	//HTMLタグを実体参照に変換する
	$('#js-sourceChange_btn').click(function(){
		var str = $("#js-sourceChange_box").val();
		if($("#js-sourceChange_check01").prop('checked') | $("#js-sourceChange_check03").prop('checked')){
			str = str.replace(/&/g, '&amp;');
			if($("#js-sourceChange_check01").prop('checked')){
				str = str.replace(/&amp;amp;/g, '&amp;');
			}
		}
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		if($("#js-sourceChange_check02").prop('checked')){
			str = str.replace(/"/g, '&quot;');
		}
		if($("#js-sourceChange_check03").prop('checked')){
			str = str.replace(/&amp;/g, '&amp;amp;');
			str = str.replace(/&lt;/g, '&amp;lt;');
			str = str.replace(/&gt;/g, '&amp;lt;');
			if($("#js-sourceChange_check02").prop('checked')){
				str = str.replace(/"/g, '&amp;quot;');
			}
		}
		$("#js-sourceChange_resultBox").val(str);
	});

	//UTF-16変換処理を実行する
	$('.js-utfChange_btn').click(function(){		//変換ボタンを押した際に実行
		$thisBtn = $(this).data('utf16chg');		//ボタンの種別判定
		var utf = $("#js-utfChange_text").val();	//テキストボックスに入力されている値を代入
		if(utf == ''){
			//テキストボックスが入力されていない場合のエラー
			$('#js-utfChange_error_notext').show();
		}else{
			//UTF-16コードに変換する
			utf = decodeStr(utf);
			$('.js-utfChange_error').hide();
			for(utf, str = "", i = 0;i < utf.length;i++){
				if($thisBtn == 'html'){
					str += "&#" + utf.charCodeAt(i).toString(10) + ";";
					$("#js-utfChange_text").val(str);
				}else if($thisBtn == 'css'){
					str += "\\00"+utf.charCodeAt(i).toString(16);
					$("#js-utfChange_text").val(str);
				}else if($thisBtn == 'decode'){
					$("#js-utfChange_text").val(utf);
				}else{
					//例外処理
					$('#js-utfChange_error_nocheck').show();
				}
			}
		}
	});
	
	//元の文字に戻した値を返す関数
	function decodeStr(strTmp){
		if(strTmp.slice(0,2) == '&#'){
			strTmp = String.fromCharCode(strTmp.slice(2,-1));
		}else if(strTmp.slice(0,3) == '\\00'){
			strTmp = strTmp.replace(/\\/g , '0x');
			strTmp = String.fromCharCode(parseInt(strTmp, 16));
		}
		return strTmp;
	}

	//よく使う文字プルダウンから選ばれた際に実行する
	$('#js-utfChange_select').change(function(){
		$('.js-utfChange_selectSub').removeClass('is-active');//表示されているプルダウンがあったらクラスを外して隠す
		//表示するプルダウンを特定して表示する
		var selected_list = '#' + $(this).children(':selected').attr("id") + '_select';
		$(selected_list).addClass('is-active');
		selectedVal(selected_list);
		$(selected_list).change(function(){
			selectedVal(this);
		});
	});

	//プルダウンから選択した値をテキストボックスに入れる
	function selectedVal($selector){//セレクタを引数に指定
		$("#js-utfChange_text").val($($selector).children(':selected').val());
	}
});
