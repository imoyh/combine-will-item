var mySqlDB = new webSqlDataBase({
		name: 'CWSEFEN3',
		version: '10',
		title: 'Combine Will',
		size: 1024
	},
	{   
		PEIFAN: ['uid unique','name','color','info','consist','time','newtime','remark'],
		JISE: ['uid unique','name','color','vender','price']
	});


$(document).ready(function () {

	$('#enter-print').click(function () {
		$('#print-wrap').scrollTop(0);
		window.print();
	});

	$('#close-print').click(function () { 
		$('#print-control').addClass('hide');
	 });

	$('#wrapper .entry-changing a').click(function () {
		$('#wrapper .entry-changing a').removeClass('active');
		$(this).each(function () {
			$(this).addClass('active');
			$('#wrapper .panel-container').removeClass('show');	
			$('#wrapper .panel-container').eq($(this).index()).addClass('show');
		})
	 });




 });






window.addEventListener('load', function () { 

	(function() {
		var aPanel = document.getElementsByClassName('panel-container');

		for(var i=0; i<aPanel.length; i++) {
			var keyName = 'panel-container-'+i;
			window.sessionStorage.setItem(keyName, aPanel[i].innerHTML);
		}
	}());

	//加载函数
	includePages();

 });

//包含页面函数
function includePages() {
	//页面函数
	biaoqian();
	peifan();
	jiseadmin();
	peifanadmin();

	//初始化
	resetPage();
	setInputFocus();
}



/**
 * 执行函数
 **/

//添加输入框初始事件
function setInputFocus() {
	if(!document.getElementById('wrapper').getElementsByTagName('input')) return; //判断页面是否存在input输入框

	//获取元素
	var timeInput = document.getElementsByName('time');
	var aInput = document.getElementById('wrapper').getElementsByTagName('input');
	var inputIndex;
	
	//输入框焦点切换
	for(var i=0; i<aInput.length; i++) {

		aInput[i].index = i;
		aInput[i].addEventListener('keydown', function (e) {
			
			var keyCode =  window.event ? e.keyCode : e.which;
			
			if(keyCode == 13 || keyCode == 40) {
				aInput[this.index + 1].focus();
			}else if(keyCode == 38 && aInput[this.index - 1]) {
				aInput[this.index - 1].focus();
			}

		});

	}

	//设置日期批号输入框placeholder
	for(var i=0; i<timeInput.length; i++) {

		timeInput[i].placeholder = time('0CCyymmdd01');
		
	}

}


//重置面板
function resetPage() {

	var aButton = document.getElementById('wrapper').getElementsByClassName('reset-button');
	if(!aButton) return;

	for(var i=0; i<aButton.length; i++) {

		aButton[i].index = i;

		aButton[i].onclick = function () {

			var keyName = 'panel-container-' + this.index;

			document.getElementsByClassName('panel-container')[this.index].innerHTML = window.sessionStorage.getItem(keyName);
			includePages();
			
		}

	}

}






/**
 * 调用函数
 **/

//删除指定元素
function removeTeam(_element){

	var _parentElement = _element.parentNode;

	if(_parentElement){

		_parentElement.removeChild(_element);

	}

	setInputFocus();

}


//调用重置
function nowResetPage(num) {
	document.getElementsByClassName('panel-container')[num-1].innerHTML = sessionStorage.getItem('panel-container-' + (num-1) );
	includePages();
}


//时间函数
function time(str) {
    str = str || '';
    var date = new Date();
    var t = {
        yy : function (vle) {
            var C = ['〇','一','二','三','四','五','六','七','八','九'];
            var y = date.getFullYear().toString();
            var Y = '';
            for(var i=0, len=y.length; i<len; i++) { Y += C[y[i]] };
            Y += '年';
            if(vle == 'y') {
                return y.slice(-2);
            }else if(vle == 'Y') {
                return Y;
            }else{
                return y;
            }
        },

        mm : function (vle) {
            var C = ['十二月','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月'];
            var c = ['十二','一','二','三','四','五','六','七','八','九','十','十一'];
            var E = ['December','January',' February','March','April','May','June','July','August','September','October','November'];
            var e = ['Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];

            if(vle != 'm') vle = eval(vle);

            if(typeof(vle) != 'string'){
                return vle[date.getMonth()];
            }else{
                if(vle == 'm') {
                    if(date.getMonth < 9 ) {
                        return '0' + (date.getMonth() + 1).toString();
                    }else{
                        return (date.getMonth() + 1).toString();
                    }
                }else{
                    return (date.getMonth() + 1).toString();
                }
            }
        },

        dd : function (vle) {
            var d = date.getDate().toString();
            var c = ['十','一','二','三','四','五','六','七','八','九'];
            var s = '';

            if(vle == 'c') {
                for(var i=0, len=d.length; i<len; i++ ) {
                    if(d == 10) {
                        s = '十';
                    }else if(d > 10 && d < 20) {
                        c[1] = '十';
                        s += c[d[i]];
                    }else if(d > 20 && d%10){
                        i ? s += c[d[i]] : s += c[d[i]] + '十';
                    }else{
                        s += c[d[i]];
                    }
                }
                return s + '日';
            }else if(vle == 'd'){
                d < 10 ? s = '0' + d : s = d;
                return s;
            }else {
                s = d;
                return s;
            }
        },

        d : function (vle) {
            var C = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            var c = ['日','一','二','三','四','五','六'];
            var E = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var e = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            vle = eval(vle);
            if(vle){
                return vle[date.getDay()];
            }else{
                return date.getDay();
            }
        },

        h : function (vle) {
            var h = date.getHours();
            if(vle == '12') {
                if(h < 12) {
                    h = date.getHours() || 12;
                    return 'AM ' + h;
                }else {
                    h ? h -= 12 : 12;
                    return 'PM ' + h;
                }
            }else if(vle == '24') {
                if(h < 10) return '0' + h.toString();
                return h.toString(); 
            }else{
                return h.toString(); 
            } 
        },

        m : function () {
            var m = date.getMinutes();
            if(m < 10) return '0' + m.toString();
            return m.toString();
        },

        s : function () {
            var s = date.getSeconds();
            if(s < 10) return '0' + s.toString();
            return s.toString();
        }
    }


    str = str.replace('YYYY',t.yy('Y'));
    str = str.replace('yyyy',t.yy());
    str = str.replace('yy',t.yy('y'));
    str = str.replace('MM',t.mm('C'));
    str = str.replace('mm',t.mm('m'));
    str = str.replace('DD',t.dd('c'));
    str = str.replace('dd',t.dd('d'));
    str = str.replace('D',t.d('C'));
    str = str.replace('d',t.d('e'));
    str = str.replace('H',t.h('24'));
    str = str.replace('h',t.h('12'));
    str = str.replace('M',t.m());
    str = str.replace('S',t.s());
    return str;
}

function prefixString(str, fix, len, vle) {
	for(var i=0, l = len-vle.length-str.length; i<l; i++) {
		str += fix;
	}
	return str += vle;
}

/**
 * 弹窗提示
 * 
 * @param {string} content
 * @returns
 */
function pointOut(content) {
	if(document.getElementById('point-out')) return;

	var poWrap = document.createElement('div');
		poWrap.id = 'point-out';
	
	var poBox = document.createElement('div');
		poBox.className = 'alert-box';

	var poHead = document.createElement('div');
		poHead.className = 'box-head';
		poHead.innerHTML = '<span>提示</span><a href="javascript:;" class="close">×</a>';
		poBox.appendChild(poHead);

	var poBody = document.createElement('div');
		poBody.className = 'content';
		poBody.innerHTML = content;
		poBox.appendChild(poBody);
	
	var closeBtn = document.createElement('button');
		closeBtn.className = 'close green';
		closeBtn.innerHTML = '确定';
		poBox.appendChild(closeBtn);

	poWrap.appendChild(poBox);
	document.body.appendChild(poWrap);

	poWrap = document.getElementById('point-out');
	closeBtn = poWrap.getElementsByClassName('close');

	closeBtn[0].onclick = closeBtn[1].onclick = function () {
		removeTeam(poWrap);
	}

	return;
}


//表格编辑
function editDataList(_target, _attr, _changes, _servefn ) {
	
	for(var i=0, len=_changes.length; i<len; i++) {

		for(var j=0, tLen=_target.length; j<tLen; j++) {

			if(_target[j].getAttribute(_attr) == _changes[i]) {

				if(_target[j].getElementsByTagName('input').length) {
					_target[j].innerHTML = _target[j].getElementsByTagName('input')[0].value;
					if(_servefn) _servefn(_target[j], _changes[i]);
				} else {
					var oInputText = document.createElement('input');
						oInputText.setAttribute('type', 'text');
						oInputText.setAttribute(_attr, _changes[i]);
						oInputText.setAttribute('value', _target[j].innerHTML);
					
					_target[j].innerHTML = '';
					_target[j].appendChild(oInputText);
				}
			}
		}
	}
}





//————————————————————————————————————————————————————————————————————//
// ──────────────────────────────────────────────────────── I ───────
//   :::::: 标签打印面板  : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
function biaoqian() { 
	
	if(!document.getElementById('biaoqian')) return; //判断页面是否存在

	var panels = $('#wrapper .panel-container'); //获取选项卡

	for(var i=0; i<panels.length; i++) { //循环每一个选项卡

		//获取必要元素
		var oUl = panels[i].getElementsByTagName('ul')[0]; 
		var aLi = oUl.getElementsByTagName('li');
		var aWrap = panels[i].getElementsByClassName('wrap');
		var aInput = aWrap[0].getElementsByTagName('input');
		var addBtn = panels[i].getElementsByClassName('add-button')[0];
		var previewBtn = panels[i].getElementsByClassName('preview-button')[0];
		
		//添加按钮自适应面板的高度
		var liHight = aInput.length * 32 + 22;
		addBtn.parentNode.style.height =  liHight + 'px';

		//添加操作事件
		addBtn.onclick = addTeam;
		previewBtn.onclick = printView;
		
		
		addAttr(); //为输入面板remove按钮添加事件
		function addAttr() {

			for(var j=0; j<aLi.length; j++) {

				if(aLi[j].getElementsByClassName('remove-button')[0]) {
					aLi[j].getElementsByClassName('remove-button')[0].setAttribute('onclick', 'removeTeam(this.parentNode)');
				}

				aLi[j].setAttribute('data-text', j+1);

			}

			return false;
		}

		//添加面板函数
		function addTeam() {
			
			//获取并拷贝一个输入面板
			oUl = this.parentNode.parentNode.parentNode;
			aLi = oUl.getElementsByTagName('li');
			var newLiOne = aLi[aLi.length-2].cloneNode(true);
			var newLiTow = aLi[aLi.length-2].cloneNode(true);

			//插入一个面板
			oUl.insertBefore(newLiOne, aLi[aLi.length-1]);
			oUl.insertBefore(newLiTow, aLi[aLi.length-1]);
			oUl.scrollTop = oUl.scrollHeight;

			//添加初始事件
			setInputFocus();
			addAttr();

			return false;
		}

		//打印输出预览函数
		function printView() { 
			
			//获取必要元素
			aWrap = this.parentNode.parentNode.getElementsByClassName('wrap'); //获取当前选项卡
			var printView = document.getElementById('print-view');
			var printWrap = document.getElementById('print-wrap');
			var printControl = document.getElementById('print-control');
			var infoPanel = document.getElementsByClassName('info-panel')[0];

			//初始化数据
			var printInfo = eval('(' + this.parentNode.parentNode.getAttribute('print-info') + ')');
			var data = getData.domValue(aWrap, 'input', 'name', 'value'); //获取JSON数据
			var sun = {a:0, b:0, c:0, d:0}; //用于判断的值
			var sizeSun = 35;
			var pageNum = 1;
			var html = '<ul>';
			var printClassName = 'print-wrap ' + printInfo.page + ' ' + printInfo.size + ' ' + printInfo.row;

			if(printInfo.page == 'max-tags') sizeSun = 8; //判断打印页面类型
			
			//循环获取的JSON数据并输出
			for(var i=0; i<data.length; i++) {

				var ele = '<li>';
				var isNull = true;
				var lotNumber = time('0CCyymmdd01');
				
				if(data[i].num > 0 && !isNaN(data[i].num)) { //判断JSON数据的完整性
					
					sun.b += parseInt(data[i].num);
					sun.d = 0;

					for(var o in data[i]) {
						if(o == 'num') break; //剔除数值

						//判断是否填写值
						if(data[i][o] != '') {
							isNull = false;
							break;
						}
					}

					//循环JSON
					for(var o in data[i]) {

						if(o == 'num') break; //剔除数值
						if(isNull) lotNumber = ''; //如果没有填写批号为空

						//获取laabel值
						var label = aWrap[0].getElementsByTagName('input')[sun.d].getAttribute('label');
						sun.d++;

						var content = data[i][o];
						
						//判断日期批号栏是否填写，如果未填写则自动填写
						if(o == 'time' && content == '') {
							content = lotNumber;
						}


						//通过label判断输出格式
						if(label) {
							ele += '<p><span>' + label + '</span>' + content + '</p>';
						}else{
							ele += '<p>' + content + '</p>';
						}

						
						
					}

					//计算打印标签个数并保存到 html变量
					for(var j=0; j<data[i].num; j++) {
						
						sun.a++;
						sun.c++;
						html += ele + '</li>';

						//为打印页断页
						if(sun.a == sizeSun) {
							sun.a = 0;
							sun.b -= sizeSun;

							if(sun.b > 0) {
								html += '</ul><ul>';
								pageNum ++;
							}

						}

					}

				}

			}
			
			//数据循环结束
			html += '</ul>';
			
			//输出打印数据和预览
			printWrap.innerHTML = printView.innerHTML = html;
			infoPanel.innerHTML = '<p><b>打印页数：</b><span>' + pageNum + ' 页</span></p><p><b>纸张大小：</b><span>' + printInfo.letter + '</span></p>';
			printWrap.className = printView.className = printClassName;
			
			//显示预览面板
			if(sun.c) {
				$('#print-control').removeClass('hide');
			}
			

			return false;
		}

	}
	
	return false;

}




//————————————————————————————————————————————————————————————————————//
// ──────────────────────────────────────────────────────── I ───────
//   ::::::	基色管理面板  : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
function jiseadmin() {

	if(!document.getElementById('jiseadmin')) return;

	(function () {
		var container = document.getElementById('jiseadmin-1'); //获取面板ID
		if(!container) return;
		addVender();

		function addVender() {
			var venderEntry = container.querySelector('.jise-vender-entry');
			var infoBox = container.querySelector('.info-text');
			var entryBtn = venderEntry.querySelector('.submit');
			if(!localStorage.getItem('jise_vender')) localStorage.setItem('jise_vender', '');
			var venderArr = localStorage.getItem('jise_vender');
			var vObj = JSON.parse('{' + venderArr + '}');
			showVender();


			entryBtn.onclick = function () {
				venderArr = localStorage.getItem('jise_vender');
				var venderName = venderEntry.querySelectorAll('input')[0].value.toLowerCase();
				var venderAbbr = venderEntry.querySelectorAll('input')[1].value.toLowerCase();
				var venderStr = '';

				if(venderName == '' && venderAbbr == '') {
					pointOut('要填写完整才能添加！<br> 没事莫乱点(¬_¬)');
					return;
				} else {
					venderStr = '"' + venderAbbr + '" : "' + venderName + '"';
				}

				if(venderArr == '' || !vObj[venderAbbr]) {
					venderArr == '' ? venderArr += venderStr : venderArr += ', ' + venderStr;
				} else {
					pointOut('此供应商缩写已存在！<br> 你可以在缩写前或后多加一个字母(^_^)');
				}

				localStorage.setItem('jise_vender', venderArr);
				pointOut('供应商【' + venderName + '】添加成功<br>供应商缩写为【' + venderAbbr + '】');
				showVender();

				venderEntry.querySelectorAll('input')[0].value = '';
				venderEntry.querySelectorAll('input')[1].value = '';
			}

			function showVender() {
				if(venderArr == '') return;
				vObj = JSON.parse('{' + venderArr + '}');
				venderArr = localStorage.getItem('jise_vender');

				var vHtml = '';

				for(var o in vObj) {
					vHtml += '<p>' + vObj[o] + '：<span>' + o + '</span><a href="javascript:;" class="remove-info">×</a></p>';
				}

				infoBox.innerHTML = vHtml;
				
				var removeBtn = infoBox.querySelectorAll('.remove-info');

				for(var i=0, len=removeBtn.length; i<len; i++) {
					removeBtn[i].onclick = function () {

						var abbr = this.parentNode.childNodes[1].innerHTML;

						var vStr = '"' + abbr + '" : "' + vObj[abbr] + '"';

						if(venderArr.indexOf(', ' + vStr) >= 0 ) {
							venderArr = venderArr.replace(', ' + vStr, "");
							localStorage.setItem('jise_vender', venderArr);
							removeTeam(this.parentNode);
						}else{
							venderArr = venderArr.replace(vStr + ', ', "");
							venderArr = venderArr.replace(vStr, "");
							localStorage.setItem('jise_vender', venderArr);
							removeTeam(this.parentNode);
						}

						pointOut('供应商【' + vObj[abbr] + '】删除成功');
						
						if(venderArr == '') infoBox.innerHTML = '请添加基色供应商！';
					}
				}
			}
			
		}

	}());


	(function () {

		var container = document.getElementById('jiseadmin-2'); //获取面板ID
		if(!container) return;

		var searchInput = container.getElementsByClassName('search-text')[0];
		var searchButton = container.getElementsByClassName('search-button')[0];
		var searchItem = container.getElementsByClassName('search-item')[0];
		var dataList = container.getElementsByClassName('data-list')[0];

		searchButton.onclick = function () {

			mySqlDB.open('JISE').show(searchItem.value.toLowerCase(), searchInput.value.toLowerCase(), showData);

		}

		mySqlDB.open('JISE').show(showData);

		function showData (dataArr) {

			var  dataHtml = document.createElement('tbody');

			for(var i=0, len=dataArr.length; i<len; i++) {

				var tr = document.createElement('tr');
					tr.id = dataArr[i]['uid'];

				var editBtn = document.createElement('button');
					editBtn.className = 'data-edit';
					editBtn.innerHTML = '修改';

				var removeBtn = document.createElement('button');
					removeBtn.className = 'data-remove';
					removeBtn.innerHTML = '删除';

				
				var btnTd = document.createElement('td');
					btnTd.setAttribute('name', 'edit');	
					btnTd.appendChild(editBtn);
					btnTd.appendChild(removeBtn);


				for(var o in dataArr[i]) {
					if(o != 'uid') {
						var td = document.createElement('td');
							td.setAttribute('name', o );
							td.innerHTML = dataArr[i][o];

							tr.appendChild(td);
					}
				}	
				tr.appendChild(btnTd);

				dataHtml.appendChild(tr);
				
			}

			if(dataHtml.innerHTML == '') {
				dataList.innerHTML = '<h2 class="table-error">数据库没有相关内容!</h2>';
			} else {
				dataList.innerHTML = dataHtml.innerHTML;
				var aEditBtn = dataList.getElementsByClassName('data-edit');
				var aRemoveBtn = dataList.getElementsByClassName('data-remove');

				for(var i=0, len=aEditBtn.length; i<len; i++) {
					aEditBtn[i].onclick = function () {
						var contentBox = this.parentNode.parentNode;
						var target = contentBox.childNodes;
						var theBtn = this;
						editDataList(target, 'name', ['color','price'], function(tgObj,cgStr){
							mySqlDB.open('JISE').update(contentBox.getAttribute('id'), cgStr, tgObj.innerHTML.toLowerCase());
						});
						this.innerHTML == '修改'? this.innerHTML = '完成' : this.innerHTML = '修改';
					};
				}

				for(var i=0, len=aRemoveBtn.length; i<len; i++) {
					aRemoveBtn[i].onclick = function () {
						var dataBox = this.parentNode.parentNode;
						mySqlDB.open('JISE').delete(dataBox.getAttribute('id'));
						removeTeam(dataBox);
					}	
				}

			}

		}

		

	}());


	(function () {

		var container = document.getElementById('jiseadmin-3'); //获取面板ID
		var contentInput = container.getElementsByClassName('data-text');
		var pushButton = container.getElementsByClassName('submit')[0];
		var dataList = container.getElementsByClassName('data-list')[0];
		var enterButton = container.getElementsByClassName('enter-button')[0];

		var trHtml = '<tr><td>';

		pushButton.onclick = function () {
			pushContent();
		};

		enterButton.onclick = function () {

			var dataTable = dataList.getElementsByClassName('tr');
			
			var dataArr = getData.domValue(dataTable,'td','name','innerHTML');
			
			var dataObjArr = [];

			for(var i=0; i<dataArr.length; i++) {
				
				var dataObj = {}
				
				for(var o in dataArr[i]) {

					if(o != 'edit') dataObj[o] = dataArr[i][o];

				}

				dataObjArr.push(dataObj);
			}
			
			mySqlDB.open('JISE').add(dataObjArr);
			pointOut('数据保存成功！！')
			nowResetPage(3);
			
		}

		function pushContent() {

			var nameStr = contentInput[0].value.toLowerCase();
			var venderStr = contentInput[2].value.toLowerCase();
			var venderObj = JSON.parse('{' + localStorage.getItem('jise_vender') + '}');
			var venderJedge;
			var uid = '';

			if(nameStr == '' && venderStr == '' && /^[A-Za-z0-9]+$/.test(nameStr.replace('-',''))) return;
			for(var o in venderObj) {
				if(venderStr == venderObj[o] || venderStr == o) {
					venderStr = o;
					var n = 11 - venderStr.length - nameStr.replace('-','').length;
					var str = '';
					if(n < 0) return;
					for(var i=0; i<n; i++){
						str += '0';
					}
					uid = venderStr + str + nameStr.replace('-','');
					venderJedge = true;
					break;
				}
			}

			if(!venderJedge) {
					pointOut('没有【' + venderStr + '】这个供应商或缩写，请在信息界面确认供应商');
					contentInput[2].focus();
			}
			
			if(uid.length != 11) return;

			var tr = document.createElement('tr');
				tr.className = 'tr';
				tr.innerHTML = '<td name="uid">' + uid + '</td>';

			var editBtn = document.createElement('button');
				editBtn.className = 'data-edit';
				editBtn.innerHTML = '修改';

			var removeBtn = document.createElement('button');
				removeBtn.className = 'data-remove';
				removeBtn.innerHTML = '删除';

			
			var btnTd = document.createElement('td');
				btnTd.setAttribute('name', 'edit');
				btnTd.appendChild(editBtn);
				btnTd.appendChild(removeBtn);

			for(var i=0, len=contentInput.length; i<len; i++) {

				var td = document.createElement('td');

				if(contentInput[i].getAttribute('name') == 'vender') {

					td.setAttribute('name',contentInput[i].name);
					td.innerHTML = venderObj[venderStr];

				} else {
					td.setAttribute('name',contentInput[i].name);
					td.innerHTML = contentInput[i].value;
				}
				
				tr.appendChild(td);
				tr.appendChild(btnTd);

				mySqlDB.open('JISE').show('uid', uid, function (value) {	
					if(value.length > 0) {
						pointOut(venderObj[venderStr] + '编号 【' + nameStr + "】 已存在！");
						contentInput[0].focus();
					}else {
						dataList.appendChild(tr);
						for(var i=0, len=contentInput.length; i<len; i++) {
							contentInput[i].value = '';
						}

						var aEditBtn = dataList.getElementsByClassName('data-edit');
						for(var i=0; i<aEditBtn.length; i++) {
							aEditBtn[i].onclick = function(){
								var contentBox = this.parentNode.parentNode;
								var target = contentBox.childNodes;
								this.innerHTML == '修改'? this.innerHTML = '完成' : this.innerHTML = '修改';
								editDataList(target, 'name', ['color','price']);
							}
						}
					}
				});
				
			}

			contentInput[0].focus();

		}
		
	}());

}




//————————————————————————————————————————————————————————————————————//
// ──────────────────────────────────────────────────────── I ───────
//   ::::::	配方打印面板  : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
function peifan() {
	if(!document.querySelector('#peifan')) return;

	(function(){
		if(!document.querySelector('#peifan-1')) return;
		var contaner = document.querySelector('#peifan-1'); //当前面板
		var schemeEntry = contaner.querySelector('.scheme-panel');
		var schemeTeam = contaner.querySelector('.scheme-team');

		//面板按钮
		var pushSchemeBtn = schemeEntry.querySelector('.push-scheme');
		var clearBtn = contaner.querySelector('.clear-button');
		var previewSchemeBtn = contaner.querySelector('.preview-scheme');
		var addColorListBtn = schemeEntry.querySelector('.add-color-list');

		//触发暂存按钮将输入的配方添加到暂存栏
		pushSchemeBtn.onclick = createScheme;

		//触发配方生成按钮将暂存的配方计算并输出到预览
		previewSchemeBtn.onclick = function () {
			var printControl = document.querySelector('#print-control');
			var previewBox = document.querySelector('#print-view'); //获取预览容器
			var printBox = document.querySelector('#print-wrap'); //获取打印容器
			var schemeList = contaner.querySelectorAll('.scheme-list'); //从当前面板中获取配方列表
			var printInfo = printControl.querySelector('.print-panel .info-panel');
			var pagination = previewBox.querySelectorAll('.box').length;

			if(!pagination) return;
			printInfo.innerHTML = '<p><b>打印页数：</b><span>' + pagination + ' 页</span></p><p><b>纸张大小：</b><span>A5</span></p>';
			printBox.innerHTML = previewBox.innerHTML;
			printBox.className = 'print-wrap scheme';
			document.querySelector('#print-control').className = 'print-control';
		}

		clearBtn.onclick = clearInput;
		runEntryPanelBtn();
		
		
		function createScheme() {
			var contentHtml = schemeEntry.querySelector('.scheme-list').cloneNode(true);
			var wrap = schemeTeam.querySelector('.wrap');

			var wrapList = document.createElement('li');
				wrapList.className = 'wrap-list';

			var listInfo = document.createElement('div');
				listInfo.className = 'list-info';

			
			var info = {};
				info.name = contentHtml.querySelector('.color-name').value;
				info.time = contentHtml.querySelector('.time-number').value;
				info.oil = contentHtml.querySelector('.addoil-btn').innerHTML;


				info.packObj = contentHtml.querySelector('.pack');
				info.amountObj = contentHtml.querySelector('.amount');
				info.meterObj = contentHtml.querySelector('.metering');

				info.baseListArr = contentHtml.querySelectorAll('.base-color .color-list');
				info.colorArr = contentHtml.querySelectorAll('.base-color .color');
				info.numberArr = contentHtml.querySelectorAll('.base-color .number');
				info.uniqueId = time('unique-ddHMS');

				info.allNumber = 0;
				info.singleNumber = 0;
				info.packNumber = 0;
				
				info.packValue = '';
				info.amounValue = '';
				info.listStr = '';
				info.meterValue = '';
				info.amountPack = '';
				
			for(var i=0, len=info.numberArr.length; i<len; i++) {
				info.allNumber -= info.numberArr[i].value;
			}

			if(info.name == '') {
				pointOut('还没有填写好呢！！');
				return;
			}

			if(info.time == '') info.time = time('0ccyymmdd01');
			if(info.oil == '否') info.oil = '';

			if(!info.allNumber) {
				pointOut('[重量栏]是不是没有填或填错了？？<br>记住了，重量栏要填[数字]( *￣▽￣)~');
				return;
			} 
			info.allNumber = 0 - info.allNumber;

			if(isNaN(info.amountObj.value) || info.amountObj.value =='') {
				pointOut('[开单数量]是不是没有填或填错了??<br>开单数量也要填[数字]( *￣▽￣)~');
				return;
			}

			if(info.packObj.value == '') {
				if(info.packObj.name == 'kg') {
					info.packValue = '5 KG';
				} else {
					info.packValue = '3 份';
				}
			} else {
				if(info.packObj.name == 'kg') {
					info.packValue = info.packObj.value + ' KG';
				} else {
					info.packValue = info.packObj.value + ' 份';
				}
			}

			if(info.amountObj.name == 'kg') {
				info.amounValue = info.amountObj.value + ' KG';
				info.amountPack = info.amounValue;
			} else {
				info.amounValue = info.amountObj.value + ' 份';
				info.amountPack = info.amounValue;
			}

			
			if(info.amountObj.name == 'kg') {
				info.allNumber = numMulti(numDiv(info.allNumber,25), info.amountObj.value);
			} else {
				info.allNumber = numMulti(info.allNumber, info.amountObj.value);
			}

			if(info.meterObj.value != '' && info.amountObj.name != 'kg') {
				info.meterValue = '× ' + info.meterObj.value + '桶';
				info.amountPack = numMulti(info.amountObj.value, info.meterObj.value) + '份'; 
			}

			//计算配方
			var previewBox = document.querySelector('#print-view'); //获取预览容器
			var printBox = document.querySelector('#print-wrap'); //获取打印容器
			var infoCompute = '';
			var computePushInt = 0;
			var computePushIntum = 0;
			var computePushJudge = true;

			for(var i=0, len=info.baseListArr.length; i<len; i++) {
				var baseList = info.baseListArr[i];
				var color = baseList.querySelector('.color').value.toLowerCase();
				var number = baseList.querySelector('.number').value;

				if(color != '' && number != '') {
					info.singleNumber = numAdd(info.singleNumber,(number - 0));
					var theNumber = 0;
					computePushInt++;
					computePushIntum++;

					(function (color, number, int){

						mySqlDB.open('JISE').show('name', color, function (data) {
							
							if(data.length != 1) {
								computePushJudge = false;
								pointOut('请查看 【' + color + '】 这个编号是否正确');
								return;
							}

							if(info.amountObj.name == 'kg') {
								theNumber = numMulti(numDiv(number-0, 25), info.amountObj.value - 0);
							} else {
								theNumber = numMulti(number-0, info.amountObj.value - 0);
							}

							info.listStr += '<p><span>' + data[0]['name'] + ' ' + data[0]['color'] + '</span><span>' + theNumber + '</span></p>';


							if(int == computePushIntum && computePushJudge) printContentFun();
								
								
						});

					}(color, number, computePushInt));

				} else if((color != '' && number == '') || (color == '' && number != '')) {
					pointOut('配方没有填写完整！！');
					return;
				} else {
					if(i>3) removeTeam(baseList);
				}
			}


			if(info.packObj.name == 'kg') {
				info.packNumber = info.packObj.value ? numMulti(info.packObj.value, numDiv(info.singleNumber,25)) : numMulti(5, numDiv(info.singleNumber,25));
			} else {
				info.packNumber = info.packObj.value ? numMulti(info.packObj.value, info.singleNumber) : numMulti(3, info.singleNumber);
			}

			//添加到暂存栏的信息
			var infoHtml =  '<p>编号：<span>' + info.name + '</span></p>' +
                    		'<p>数量：<span>' + info.amounValue + '</span></p>' +
                        	'<p>总重：<span>' + info.allNumber +' 克</span></p>' +
                        	'<p>包装：<span>' + info.packValue + '</span></p>' +
                        	'<p>总数：<span>' + info.amountPack + '</span></p>';
				listInfo.innerHTML = infoHtml;
			
			var listRevise = document.createElement('button');
				listRevise.className = 'list-revise';
				listRevise.innerHTML = '修改';
				listRevise.setAttribute('uniqueId', info.uniqueId);



			var listContent = document.createElement('div');
				listContent.className = 'list-content';
				listContent.appendChild(contentHtml);


			function printContentFun() {
				var printContent = 	'<div class="box ' + info.uniqueId + '"><div class="wrap"><div class="head"><div class="title"><h1>'
									+ info.name
									+ '</h1><p>'
									+ info.time
									+ '</p></div><div class="aside"><p>'
									+ info.singleNumber + '克 ／1 份'
									+ '</p><p>'
									+ info.packNumber + ' 克 ／' + info.packValue
									+ '</p></div><hr><hr><div class="info"><div class="top"><p>'
									+ info.oil
									+ '</p><p>'
									+ info.amounValue + info.meterValue
									+ '</p><p>'
									+ '共计 ' + info.amountPack
									+ '</p></div><div class="bottom">'
									//+'<hr><hr><p>这是色粉信息，手动开单不出现这是,色粉信息，手动开单不出现</p>'
									+'</div></div></div><hr><hr><div class="body">'
									+ info.listStr
									+ '</div> <hr><hr><hr><div class="foot"><p>'
									+ '每单重量：' + info.allNumber + ' 克'
									+ '</p><p>'
									+ time('开单时间：yyyy年mm月dd日 D H:M:S')
									+ '</p></div></div></div>';
				
				previewBox.innerHTML += printContent;	

				wrapList.appendChild(listInfo);
				wrapList.appendChild(listContent);
				wrapList.appendChild(listRevise);
				wrap.appendChild(wrapList);
				banListInput();
				clearInput();
				reviseList();
				wrap.scrollTop = wrap.scrollHeight;
			}
		}
		
		function runEntryPanelBtn() {

			var addoilBtn = schemeEntry.querySelector('.addoil-btn');
			var packBtn = schemeEntry.querySelector('.pack-btn');
			var amountBtn = schemeEntry.querySelector('.amount-btn');
			var timeNumber = schemeEntry.querySelector('.time-number');
			var addColorListBtn = schemeEntry.querySelector('.add-color-list');
			
			timeNumber.setAttribute('placeholder',time('0ccyymmdd01'))

			addoilBtn.onclick = function () {
				this.innerHTML == '否' ? this.innerHTML = '加扩散油' : this.innerHTML = '否';
			}

			addColorListBtn.onclick = function () {
				var baseColor = schemeEntry.querySelector('.base-color');
				var obj = document.createElement('p');
					obj.className = 'color-list';
					obj.innerHTML = '<input type="text" class="color"> <input type="text" class="number">';

				baseColor.appendChild(obj);
				baseColor.scrollTop = baseColor.scrollHeight;
				setInputFocus();
			}

			packBtn.onclick = amountBtn.onclick = function () {
				if(this.innerHTML == '份') {
					this.innerHTML = 'KG'
					if(this.parentNode.querySelector('.pack')) {
						this.parentNode.querySelector('.pack').setAttribute('placeholder','默认为5KG');
					}
					this.parentNode.querySelector('input').name = 'kg';
				} else {
					this.innerHTML = '份'
					if(this.parentNode.querySelector('.pack')) {
						this.parentNode.querySelector('.pack').setAttribute('placeholder','默认为3份');
					}
					this.parentNode.querySelector('input').name = '';
				}
			}
			
		}

		function banListInput() {	
			var teamInput = schemeTeam.querySelectorAll('input[type=text]');
			for(var i=0, len = teamInput.length; i<len; i++) {
				teamInput[i].setAttribute('disabled','disabled');
			}
		}

		function clearInput() {
			var entryInput = schemeEntry.querySelectorAll('input[type=text]');
			for(var i=0, len = entryInput.length; i<len; i++) {
				entryInput[i].value = '';
			}
			entryInput[0].focus();
		}

		function reviseList() {
			var button = schemeTeam.querySelectorAll('.list-revise');
			for(var i=0, len=button.length; i<len; i++) {
				button[i].onclick = function () {
					var wrap = schemeEntry.querySelector('.wrap');
					var content = this.parentNode.querySelector('.scheme-list');
					var printBox = document.querySelector('#print-view');
					var deleteBox = printBox.getElementsByClassName(this.getAttribute('uniqueId'))[0];

					printBox.removeChild(deleteBox);
					wrap.removeChild(wrap.querySelector('.scheme-list'));
					wrap.appendChild(content);
					this.parentNode.parentNode.removeChild(this.parentNode)
					var aInput = wrap.querySelectorAll('input[type=text]');
					for(var i=0, len = aInput.length; i<len; i++) {
						aInput[i].removeAttribute('disabled');
					}
					runEntryPanelBtn();
				}
			}
		}

		


	}());


}




//————————————————————————————————————————————————————————————————————//
// ──────────────────────────────────────────────────────── I ───────
//   ::::::	配方管理面板  : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
function peifanadmin() {
	
	(function () {
		if(!document.querySelector('#peifanadmin-1')) return;
		var container = document.querySelector('#peifanadmin-1');
	}());


	(function () {
		if(!document.querySelector('#peifanadmin-2')) return;
		var container = document.querySelector('#peifanadmin-2');
		
		var base = {};
		var title = {};

		var saveBtn = container.querySelector('.save-button');

			saveBtn.onclick = getDataAndSave;

		function getDataAndSave() {
			title.name = container.querySelector('.color-name').value.toLowerCase();
			title.color = container.querySelector('.color-text').value.toLowerCase();
			title.info = container.querySelector('.color-info').value.toLowerCase();
			title.remark = container.querySelector('.color-remark').value.toLowerCase();

			if(title.name == '' && title.color == '' && title.info == '') {
				pointOut('没有填写完整');
				return false;
			}

			var content = {};
			var color = container.querySelectorAll('.color');
			var number = container.querySelectorAll('.number');
			var base = {};
			var num = 0;

			for(var i=0, len=color.length; i<len; i++) {
				if((color[i].value != '' && number[i].value == '') || (color[i].value == '' && number[i].value != '') || isNaN(number[i].value)) {
					pointOut('格式填写不正确');
					return;
				}

				if(color[i].value != '' && number[i].value != '') {
					num++;
					(function(judge, name, number) {
						mySqlDB.open('JISE').show('name', name, function(data){
							
							if(data.length == 0 ) {
								pointOut('编号【 ' + name + ' 】不存在！');
								return;
							}

							base[name] = number - 0;

							if(judge == num) {
								content.uid = prefixString('0cc1', '0', 11, title.name);
								content.name = title.name;
								content.color = title.color;
								content.info = title.info;
								content.consist = JSON.stringify(base);
								content.time = time('yyyy-mm-dd');
								content.newtime = '未修改';
								content.remark = title.remark;
								mySqlDB.open('PEIFAN').add([content]);
								pointOut('添加配方【' + content.name + '】成功！');

								var allInput = container.querySelectorAll('.import-panel input');
								for(var i=0, len=allInput.length; i<len; i++) {
									allInput.value = '';
								}
								allInput[0].focus();

							}
						});
					}(num, color[i].value.toLowerCase(), number[i].value - 0));	
				}
			}
		}
		

	}());


}












//数据获取对象
window.getData = {
	
	domValue : function (_elements, _target, _attr, _value) { //需要获取数据的区域，需要获取的目标，通过指定值存放数据
		
		if(!_elements) return;

		var values = [];

		for(var i=0; i<_elements.length; i++) {
			var aTarget = _elements[i].getElementsByTagName(_target);
			
			var arr = [];

			for(var j=0; j<aTarget.length; j++) {

				var a = aTarget[j].getAttribute(_attr).toLowerCase();
				var v = aTarget[j][_value].toLowerCase();

				if(a) arr[a] = v;

			}
		
			values[i] = arr;

		}

		return values;
		
	},







	close : false
};

 /**
* 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
*
* @param num1加数1 | num2加数2
*/
function numAdd(num1, num2) {
   var baseNum, baseNum1, baseNum2;
   try {
       baseNum1 = num1.toString().split(".")[1].length;
   } catch (e) {
       baseNum1 = 0;
   }
   try {
       baseNum2 = num2.toString().split(".")[1].length;
   } catch (e) {
       baseNum2 = 0;
   }
   baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
   return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/**
* 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
*
* @param num1被减数  |  num2减数
*/
function numSub(num1, num2) {
   var baseNum, baseNum1, baseNum2;
   var precision;// 精度
   try {
       baseNum1 = num1.toString().split(".")[1].length;
   } catch (e) {
       baseNum1 = 0;
   }
   try {
       baseNum2 = num2.toString().split(".")[1].length;
   } catch (e) {
       baseNum2 = 0;
   }
   baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
   precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
   return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};

/**
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
*
* @param num1被乘数 | num2乘数
*/
function numMulti(num1, num2) {
   var baseNum = 0;
   try {
       baseNum += num1.toString().split(".")[1].length;
   } catch (e) {
   }
   try {
       baseNum += num2.toString().split(".")[1].length;
   } catch (e) {
   }
   return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};

/**
* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
*
* @param num1被除数 | num2除数
*/
function numDiv(num1, num2) {
   var baseNum1 = 0, baseNum2 = 0;
   var baseNum3, baseNum4;
   try {
       baseNum1 = num1.toString().split(".")[1].length;
   } catch (e) {
       baseNum1 = 0;
   }
   try {
       baseNum2 = num2.toString().split(".")[1].length;
   } catch (e) {
       baseNum2 = 0;
   }
   with (Math) {
       baseNum3 = Number(num1.toString().replace(".", ""));
       baseNum4 = Number(num2.toString().replace(".", ""));
       return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
   }
};





