#!/usr/bin/env node


/*
* 文件格式为竖版
* title content
* XXX    XXX
*/
var xlsx = require('node-xlsx');
var fs = require('fs');



if (fs.existsSync(process.argv[2] + ".xlsx")) {
	var list = xlsx.parse(process.argv[2] + ".xlsx");
	//console.log(list);
	// console.log(JSON.stringify(list));
	// console.log('正在读取文件...');
	changeObj(list);
	function changeObj(list) {
		var objArr = {};
		for (var i = 0; i < list.length; i++) {
			var excleArr = list[i].data;
			var name = list[i].name;
			var keyArray = excleArr[0];
			for (var k = 1; k < excleArr.length; k++) {
			 	var excleDataArr = excleArr[k];
				var obj = {};
				var titleobj = {};
				obj[keyArray[0]] = excleDataArr[0];
				obj[keyArray[1]] = excleDataArr.splice(1);
			}	
			objArr[name] = obj;	
		};
		if (!fs.existsSync('text')) {
			fs.mkdirSync('text', 0777);
			try {
				fs.writeFileSync('text/'+ process.argv[2] +'.js' ,'module.exports = ' + JSON.stringify(objArr),'utf-8');
				console.log('json文件已生成');
			} catch(err) {
				console.log(err)
			}
		} else {
			try {
				fs.writeFileSync('text/'+ process.argv[2] +'.js' ,'module.exports = ' + JSON.stringify(objArr),'utf-8');
				console.log('json文件已生成');
			} catch(err) {
				console.log(err)
			}
		};	
	}
} else {
	console.log(process.argv[2] + ".xlsx 文件不存在" )
};



