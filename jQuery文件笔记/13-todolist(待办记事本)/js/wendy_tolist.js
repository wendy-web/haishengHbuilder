$(function(){
	loadData()
	$("#title").keydown(function(event){
		// console.log(event)
		if(event.keyCode == 13) {
			if($(this).val() == ""){
				alert("请输入相关内容")
			}  else{
				var data = getDate()
				data.push({
					title:$(this).val(),
					done:false
				})
				save(data)
				loadData()
			}
		}
	})
	// 读取本地的数据
	function getDate(){
		var list = localStorage.getItem("todolist")
		if(list !== null){
			return JSON.parse(list)
		} else{
			return [];
		}
	}
	// 保存数据
	function save(data){
		//JSON.stringify将对象转换为数组的形式
		localStorage.setItem("todolist", JSON.stringify(data))
	}
	// 渲染加载数据
	function loadData(){
		var data = getDate()
		$("ul,ol").empty();//清空数据的列表
		var todocount = 0;//要做的个数
		var donecount = 0;//已经完成的个数
		$.each(data, function(index, ele){
			if(ele.done){
				$("ul").prepend("<li><input type='checkbox' checked='checked' ><p>" + ele.title + "</p> <a href='javascript:;' id=" + index + " ></a></li>")
				donecount++;
			} else {
				$("ol").prepend("<li><input type='checkbox' ><p>" + ele.title + "</p> <a href='javascript:;' id=" + index + " ></a></li>")
				todocount++;
			}
			// 显示列表的个数
			$("#todocount").text(todocount);
			$("#donecount").text(donecount);
		})
	}
	// 双击修改内容
	// $("ol, ul").on("dblclick", "p", function() {
	// 	// 双击禁止选定文字
	// 	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	// 	var index = $(this).siblings("a").attr("id")
	// 	var data =  getDate()
	// 	console.log(data[index].done)
	// 	// 判断是否时候完成的，是完成项就不可进行修改内容，return退出
	// 	if(data[index].done) return;
	// 	var value = $(this).text()
	// 	this.innerHTML = '<input type="text" />';
	// 	$(this).find("input").val(value)
	// 	var input = $(this).find("input")
	// 	input.select();//选中input中的val值
	// 	// 鼠标失去焦点时间
	// 	input.blur(function(){
	// 		$(this).parent("p").text($(this).val())
	// 		data[index].title = $(this).val()
	// 		save(data)
	// 		loadData()
	// 	})
	// 	// 鼠标按下回车后，执行鼠标失去焦点事件
	// 	input.keyup(function(e){
	// 		if(e.keyCode == 13){
	// 			input.blur()
	// 		}
	// 	})
	// })
	// 兼容手机的双击事件
	var touchtime = new Date().getTime()
	console.log(touchtime)
	$("ol, ul").on("click", "p", function() {
		if(new Date().getTime() - touchtime < 500 ){
			console.log("dblclick")
			// 双击禁止选定文字
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			var data = getDate()
			var index = $(this).siblings("a").attr("id")
			if(data[index].done) return;
			var valueText = $(this).text()
			var inputNode = $('<input type="text" />')
			$(this).append(inputNode)
			$(this).find("input").val(valueText)
			$(this).find("input").select().blur(function() {
				$(this).parent("p").text($(this).val())
				data[index].title = $(this).val()
				save(data)
				loadData()
			})
		}else{
			// 第一次点击的时候
			touchtime = new Date().getTime()
		}
	})
	
	
	
	// 点击删除数据
	$("ul, ol").on("click", "a", function(){
		var data = getDate()
		var index = $(this).data(index)
		data.splice(index, 1)
		save(data)
		loadData()
	})
	// 选择完成与否 
	$("ol, ul").on("click", "input", function(){
		var data = getDate()
		var index = $(this).siblings("a").attr("id")
		data[index].done = $(this).prop("checked");
		save(data)
		loadData()
		
	})
})