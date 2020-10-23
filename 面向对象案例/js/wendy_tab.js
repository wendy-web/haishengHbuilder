var that = this;
class Tab{
	constructor(id) {
	    that = this;
		this.main = document.querySelector(id);;//主要的整个div
		this.add = this.main.querySelector(".tabadd");
		// lis的元素
		this.ul = this.main.querySelector(".fisrstnav ul:first-child")
		this.tabscon = this.main.querySelector(".tabscon")
		this.init();//执行这个函数
	}
	init() {
		this.updateNode();//先获取到新的
		this.add.onclick = this.addTab;
		for (var i = 0; i < this.tabLis.length; i++) {
			this.tabLis[i].index = i
			this.tabLis[i].onclick = this.tabtoggle;
			this.remove[i].onclick = this.removeNode;
			this.spans[i].ondblclick = this.editTab;
			this.sections[i].ondblclick = this.editTab;
		}
	}
	// 修改功能
	editTab() {
		//获取当前 
		var star = this.innerHTML;
		// 双击不让文字选中
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		this.innerHTML = "<input type = 'text'/>"
		var input = this.children[0]
		input.value = star;
		// 选中文中的文字
		input.select();
		// 当离开这个input的输入时，将input上输入的值赋值上给span
		input.onblur = function() {
			this.parentNode.innerHTML = this.value;
		}
		// 按下回车的时候也可以把文本框里面的指给span
		input.onkeyup = function(e){
			if(e.keyCode == 13){
				// 手动回车后执行失去焦点事件
				this.blur();
			}
		}		
	}
	// 用于添加或删除的lis获取新的数组内容
	updateNode() {
		this.tabLis = this.main.querySelectorAll("li");//切换的li标签
		this.sections = this.main.querySelectorAll("section");//切换的内容
		this.remove = this.main.querySelectorAll(".icon-guanbi");//移除的按钮
		this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");//要修改的span内容
	}
	// 添加的功能
	addTab() {
		// 清除之前的所有类名
		that.clearClass();
		var random = Math.random();
		var li =  '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
		var section = '<section class="conactive">测试 ' + random + '</section>';
		// 把新建的元素追加到对应的父元素里面
		that.ul.insertAdjacentHTML('beforeend', li)
		that.tabscon.insertAdjacentHTML('beforeend', section)
		that.init();
	}
	
	// 清空所有的class的name
	clearClass(){
		for(var i = 0; i < this.tabLis.length; i++) {
			this.tabLis[i].className = '';
			this.sections[i].className = '';
		}
	}
	// 切换tablist
	tabtoggle() {
		that.clearClass();//清除所有的类名
		this.className = "liactive";
		that.sections[this.index].className = 'conactive';
	}
	// 删除单个的lis
	removeNode(e) {
		e.stopPropagation()
		var index = this.parentNode.index;//寻找到父亲的节点
		that.tabLis[index].remove()
		that.sections[index].remove()
		that.init();//重新获取一遍新的里面的内容
		// 当删除的不是选中的时候就直接热return
		if(document.querySelector(".liactive")) return
		index--;
		// 当index不存在的时候就不执行， && 直接触发click事件0
		that.tabLis[index] && that.tabLis[index].click()
	}
}
new Tab('#tab')