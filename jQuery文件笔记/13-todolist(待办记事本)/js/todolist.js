$(function() {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
	// 双击修改内容
	// $("ol, ul").on("dblclick", "p", function() {
	// 	// 双击禁止选定文字
	// 	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	// 	var data =  getDate()
	// 	var index = $(this).siblings("a").attr("id")
	// 判断是否时候完成的，是完成项就不可进行修改内容，return退出
	// if(data[index].done) return;
	// 	var value = $(this).text()
	// 	this.innerHTML = '<input type="text" />';
	// 	$(this).find("input").val(value)
	// 	var input = $(this).find("input")
	// 	input.select();//选中input中的val值
	// 	// 鼠标失去焦点时间
	// 	input.blur(function(){
	// 		$(this).parent("p").text($(this).val())
	// 		data[index].title = $(this).val()
	// 		saveDate(data)
	// 		load()
	// 	})
	// 	// 鼠标按下回车后，执行鼠标失去焦点事件
	// 	input.keyup(function(e){
	// 		if(e.keyCode == 13){
	// 			input.blur()
	// 		}
	// 	})
	// })
	
	// 兼容手机的双击事件
	var touchtime = new Date().getTime();
	$("ol, ul").on("click", "p", function(){
		if( new Date().getTime() - touchtime < 500 ){
			console.log("dblclick");
			// 双击禁止选定文字
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			var data =  getDate()
			var index = $(this).siblings("a").attr("id")
			// 判断是否时候完成的，是完成项就不可进行修改内容，return退出
			if(data[index].done) return;
			var value = $(this).text()
			this.innerHTML = '<input type="text" />';
			$(this).find("input").val(value)
			var input = $(this).find("input")
			input.select();//选中input中的val值
			// 鼠标失去焦点时间
			input.blur(function(){
				$(this).parent("p").text($(this).val())
				data[index].title = $(this).val()
				saveDate(data)
				load()
			})
			// 鼠标按下回车后，执行鼠标失去焦点事件
			input.keyup(function(e){
				if(e.keyCode == 13){
					input.blur()
				}
			})
		}else{
			touchtime = new Date().getTime();
			console.log("click")
		}
	});
	
	// //定义setTimeout执行方法
	// var TimeFn = null;
	// $('div').click(function () {
	//     // 取消上次延时未执行的方法
	//     clearTimeout(TimeFn);
	//     //执行延时
	//     TimeFn = setTimeout(function(){
	//         //do function在此处写单击事件要执行的代码
	//     },300);
	// });
	
	// $('div').dblclick(functin () {
	//      // 取消上次延时未执行的方法
	//     clearTimeout(TimeFn);
	//     //双击事件的执行代码
	// })
	
	
	
	
	
    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
		// 存储需要将对象的格式 》转换 》为字符串的格式
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }

})