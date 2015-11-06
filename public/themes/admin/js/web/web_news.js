$(function(){
	$.webmis.inc({files:[
		$webmis_plugin + 'form/Validform.min.js',
		$webmis_plugin + 'chart/Chart.min.js',
		$webmis_plugin + 'edit/tinymce/tinymce.min.js',
		$webmis_plugin + 'date/datepicker/datepicker.js',
		$webmis_plugin + 'date/datepicker/datepicker.css'
	]});
/* Index */
	$('#listBG').webmis('TableOddColor');
/* Search */
	$('#ico-search').click(function(){
		if(!IsMobile){moWidth = 420;}
		$.webmis.win('open',{title:$(this).text(),width:moWidth,height:320});
		// Content
		var url = $('#getUrl').text();
		$.get($base_url+'WebNews/sea'+url,function(data){
			$.webmis.win('load',data);
			$('#seaSub').webmis('SubClass');
		});
		return false;
	});
/* Add */
	$('#ico-add').click(function(){
		if(!IsMobile){moWidth = 840; moHeight= 560;}
		$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
		// Content
		$.get($base_url+'WebNews/add',function(data){
			$.webmis.win('load',data);
			newsClass();
			newsForm('tab');
		});
		return false;
	});
/* Edit */
	$('#ico-edit').click(function(){
		var id = $('#listBG').webmis('GetInputID');
		if(id){
			if(!IsMobile){moWidth = 840; moHeight= 560;}
			$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
			// Content
			$.post($base_url+'WebNews/edit',{'id':id},function(data){
				$.webmis.win('load',data);
				$('#newsID').val(id);
				newsClass();
				newsForm('tab');
			});
		}else{noSelect();}
		return false;
	});
/* Del */
	$('#ico-del').click(function(){
		var id = $('#listBG').webmis('GetInputID',{type:'json'});
		if(id){
			$.webmis.win('open',{title:$(this).text(),width:280,height:160});
			$.post($base_url+'WebNews/del',{'id':id},function(data){
				$.webmis.win('load',data);
				$('#Sub').webmis('SubClass');
				$('#DelID').val(id);
				newsForm();
			});
		}else{noSelect();}
		return false;
	});
/* Audit */
	$('#ico-audit').click(function(){
		var id = $('#listBG').webmis('GetInputID',{type:'json'});
		if(id){
			$.webmis.win('open',{title:$(this).text(),width:280,height:160});
			$.post($base_url+'WebNews/audit',{'id':id},function(data){
				$.webmis.win('load',data);
				$('#Sub').webmis('SubClass');
				$('#DelID').val(id);
				newsForm();
			});
		}else{noSelect();}
		return false;
	});
/* Chart */
	$('#ico-chart').click(function(){
		if(!IsMobile){moWidth = 620; moHeight= 450;}
		$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
		// Content
		$.post($base_url+'WebNews/chart',function(data){
			// Create
			$('#WebMisWinCT').html('<div style="padding: 50px;"><canvas id="myChart" style="width: 100%; height: 100%;"></canvas>');
			var ctx = $("#myChart").get(0).getContext("2d");
			var myNewChart = new Chart(ctx).Pie(data);
		},'json');
		return false;
	});
});

/* Form validation */
function newsForm($type){
	$('#Sub').webmis('SubClass');
	// Tab
	if($type=='tab'){
		$.webmis.win('menu',{change:'#newsBody', menus:[$('#TabName1').text(),$('#TabName2').text(),$('#TabName3').text()]});
	}
	// Lang
	var lang = $('#Lang').text();
	var Lang = '';
	if(lang=='zh-cn'){
		Lang = 'zh_CN';
		$.webmis.inc({files:[$webmis_plugin + 'date/datepicker/datepicker.zh-CN.js']});
	}
	// Date
	$('#datepicker').datepicker({dateFormat: "yyyy-mm-dd",weekStart: 1});
	// Editr
	TinyMce('#tinymce',Lang);
	// Validform
	$("#newsForm").Validform({ajaxPost:true,tiptype:2,
		callback:function(data){
			$.Hidemsg();
			if(data.status=="y"){
				var url = $('#getUrl').text();
				$.webmis.win('close',data.url+url);
			}else{
				$.webmis.win('close');
				$.webmis.win('open',{title:data.title,content:'<b class="red">'+data.msg+'</b>',AutoClose:3,AutoCloseText:data.text});
			}
		}
	});
	// Upload
	$('#listBG').webmis('TableOddColor');
	var num = $("#NumIMG").val();
	if(num > 0){for(i=num;i>0;i--){uploadIMG(i);}}
}
/* Editr */
function TinyMce(obj,Lang){
	tinymce.init({
		selector: obj,
		language: Lang,
		convert_urls: false,
		height: 425,
		menubar: false,
		plugins: [
			"advlist autolink lists link image charmap print preview hr anchor pagebreak",
			"searchreplace wordcount visualblocks visualchars code fullscreen",
			"insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
		],
		toolbar1: "insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor emoticons | link image media | code preview"
	});
}
/* Menus */
function newsClass(){
	$('#newsClass').webmis('AutoSelect',{
		url:$base_url+'WebNews/getMenu',
		num:2,
		data:'0',
		getValType:':',
		type:'post',
		getVal:'#menus_fid'
	});
}

/* News Show */
function newsShow(id,title){
	if(!IsMobile){moWidth = 720; moHeight= 580;}
	$.webmis.win('open',{title:title,width:moWidth,height:moHeight,overflow:true});
	//加载内容
	$.post($base_url+'WebNews/show',{'id':id},function(data){
		$.webmis.win('load',data);
	});
}