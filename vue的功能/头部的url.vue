<template>
</template>

<script>
	//paraName 等找参数的名称
	data: {
		agentid: this.GetUrlParam('code'),//推荐人ID
	},
	GetUrlParam(paraName) {
		var url = document.location.toString();
		var arrObj = url.split("?");
		if (arrObj.length > 1) {
			var arrPara = arrObj[1].split("&");
			var arr;

			for (var i = 0; i < arrPara.length; i++) {
				arr = arrPara[i].split("=");

				if (arr != null && arr[0] == paraName) {
					return arr[1];
				}
			}
			return "";
		} else {
			return "";
		}
	},
</script>

<style>
</style>
