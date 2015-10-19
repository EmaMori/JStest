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

	//選択した値をテキストボックスに入れる
	function selectedVal($selector){//セレクタを引数に指定
		$("#js-utfChange_text").val($($selector).children(':selected').val());
	}

	//変換ボタンを押した際に処理を実行する
	$('.js-utfChange_btn').click(function(){
		if($("#js-utfChange_text").val() == ''){
			//テキストボックスが入力されていない場合のエラー
			$('#js-utfChange_error_notext').show();
		}else{
			//機種依存文字をUTF-16コードに変換する
			var utf = $("#js-utfChange_text").val();
			var utfTmp = utf;
			$('.js-utfChange_error').hide();
			for(utf, str = "", i = 0;i < utf.length;i++){
				if($("#js-utfChange_check01").prop('checked')){
					str += "&#" + utf.charCodeAt(i).toString(10) + ";";
					$("#js-utfChange_text").val(str);
	
				}else if($("#js-utfChange_check02").prop('checked')){
					str += "\\00"+utf.charCodeAt(i).toString(16);
					$("#js-utfChange_text").val(str);
				}else if($("#js-utfChange_check02").prop('checked')){
					str += "\\00"+utf.charCodeAt(i).toString(16);
					$("#js-utfChange_text").val(str);
				}else{
					//例外処理
					$('#js-utfChange_error_nocheck').show();
				}
			}
		}
	});
	
	//よく使う文字プルダウンから選ばれた際に実行する
	$('#js-utfChange_select').change(function(){
		$('.js-utfChange_selectSub').removeClass('is-active');//表示されているプルダウンがあったらクラスを外して隠す
		//表示するプルダウンを特定して表示する
		var selected_list = '#' + $(this).children(':selected').attr("id") + '_select';
		$(selected_list).addClass('is-active');
		selectedVal(selected_list);
		$(selected_list).change(function(){
			selectedVal(this);
			n16combert();
		});
	});
});
/*
//<![CDATA[
function n16combert(){
	for(var b=document.getElementById("n16convert").value,c="",a=0;a<b.length;a++)
		c+="\\00"+b.charCodeAt(a).toString(16);document.getElementById("n16convert").value=c
	};
function add16(opt) {document.getElementById("n16convert").value= opt.options[opt.selectedIndex].value;}
//]]&gt;
*/