/* documents */
const mettingDocs = {
	title: "WTT2022",
	vice_title: "第七届全国热传导研讨会",
	description:
		"近年来热传导研究在凝聚态物理、统计物理、工程热物理、导热材料等领域取得了长足的进展，研究学者们也提出了很多新的科学问题。\n在此背景下，国内外同行决定举办一年一度的“热传导研讨会”。该研讨会能够为国内从事热能科学及其交叉领域研究的师生提供很好的交流与合作平台。\n目前该研讨会已成功举办六届：首届研讨会于2016年在南京师范大学举行；第二、三、四、五、六届分别由扬州大学、厦门大学和华侨大学、华中科技大学、青岛科技大学、昆明理工大学承办。",
	metting_info:
		'第一轮会议通知<span><i class="fa fa-calendar"></i>2022年06月06日</span>',
	metting_topic: [
		"声子学",
		"声子工程",
		"拓扑手性声子",
		"低维纳米传热",
		"量子热输运",
		"热超材料",
		"热蒸发",
		"热辐射",
		"柔性材料导热",
		"电池热管理",
		"传热与传质",
		"热物性测量",
		"热电转换",
		"热能利用与存储",
	],
	metting_date: "2022年08月06日——08月09日",
	metting_location: "雅庭海湾国际大酒店（深圳市盐田区海山路2号）",
};
window.onload = function () {
	/* Load Header Map */
	var map;
	//定义地图中心点坐标
	var center = new TMap.LatLng(22.554521, 114.242265);
	function initApp() {
		//地图初始化函数，本例取名为init，开发者可根据实际情况定义
		function initMap() {
			//定义map变量，调用 TMap.Map() 构造函数创建地图
			map = new TMap.Map(document.getElementById("location__container"), {
				center: center, //设置地图中心点坐标
				zoom: 16.2, //设置地图缩放级别,
				minZoom: 10,
				maxZoom: 17,
				pitch: 43.5, //设置俯仰角
				rotation: 45, //设置地图旋转角度
			});

			//创建并初始化MultiMarker
			var markerLayer = new TMap.MultiMarker({
				map: map, //指定地图容器
				//样式定义
				styles: {
					//创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
					myStyle: new TMap.MarkerStyle({
						width: 25, // 点标记样式宽度（像素）
						height: 35, // 点标记样式高度（像素）
						//焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
						anchor: { x: 16, y: 32 },
					}),
				},
				//点标记数据数组
				geometries: [
					{
						id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
						styleId: "myStyle", //指定样式id
						position: new TMap.LatLng(22.553443, 114.24181), //点标记坐标位置
						properties: {
							//自定义属性
							title: "雅庭海湾国际大酒店",
						},
					},
					{
						//第二个点标记
						id: "2",
						styleId: "marker",
						position: new TMap.LatLng(22.553371, 114.24227),
						properties: {
							title: "地下停车场",
						},
					},
				],
			});
		}

		function initRoadMap(startPosition, endPosition) {
			var instructionContainer = document.getElementById(
				"location__instruction"
			);
			instructionContainer.innerHTML =
				'<h4 style="text-align:center;"><i class="fa fa-spinner fa-spin"></i></h4>';

			var ne = new TMap.LatLng(
				Math.max(startPosition.getLat(), endPosition.getLat()) * 1.0005,
				Math.max(startPosition.getLng(), endPosition.getLng()) * 1.0005
			); //东北角坐标
			var sw = new TMap.LatLng(
				Math.min(startPosition.getLat(), endPosition.getLat()) * 0.9995,
				Math.min(startPosition.getLng(), endPosition.getLng()) * 0.9995
			); //西南角坐标

			map = new TMap.Map("location__container", {
				minZoom: 10,
				maxZoom: 17,
				center: new TMap.LatLng(
					(startPosition.getLat() + endPosition.getLat()) / 2,
					(startPosition.getLng() + endPosition.getLng()) / 2
				),
			});

			var latLngBounds = new TMap.LatLngBounds(sw, ne);
			map.fitBounds(latLngBounds);

			var marker = new TMap.MultiMarker({
				// 创造MultiMarker显示起终点标记
				id: "marker-layer",
				map: map,
				styles: {
					start: new TMap.MarkerStyle({
						width: 25,
						height: 35,
						anchor: { x: 16, y: 32 },
						src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
					}),
					end: new TMap.MarkerStyle({
						width: 25,
						height: 35,
						anchor: { x: 16, y: 32 },
						src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
					}),
				},
				geometries: [
					{
						id: "start",
						styleId: "start",
						position: startPosition,
					},
					{
						id: "end",
						styleId: "end",
						position: endPosition,
					},
				],
			});
			var polylineLayer = new TMap.MultiPolyline({
				// 创建 MultiPolyline显示路径折线
				map: map,
				styles: {
					style_blue: new TMap.PolylineStyle({
						color: "#3777FF",
						width: 10,
						borderWidth: 0,
						showArrow: true,
						arrowOptions: {
							space: 70,
						},
						lineCap: "round",
					}),
				},
				geometries: [],
			});
			var transit = new TMap.service.Transit({
				// 新建一个公交路线规划类
				policy: "RECOMMEND", // 规划策略
			});
			transit
				.search({ from: startPosition, to: endPosition })
				.then((result) => {
					//搜索路径
					var route = result.result.routes[0];
					var transStr = "<h4>公交路线规划</h4>";
					var rainbowPaths = [];
					route.steps.forEach((step) => {
						if (step.mode === "WALKING") {
							rainbowPaths.push({
								path: step.polyline,
								color: "rgba(51, 51, 255, 1)",
							}); //绘制步行路线
							transStr += `<h5>步行（${step.duration}分钟）</h5>`;
							step.steps &&
								step.steps.forEach((subStep, index) => {
									transStr += `<p>${index + 1}. ${
										subStep.instruction
									}</p>`; // 显示步行指引
								});
						} else {
							step.lines.forEach((line) => {
								if (line.vehicle === "SUBWAY") {
									rainbowPaths.push({
										path: line.polyline,
										color: "rgba(245, 185, 23, 1)",
									}); //绘制地铁路线
								} else {
									rainbowPaths.push({
										path: line.polyline,
										color: "rgba(28, 204, 108, 1)",
									}); //绘制非地铁公交路线
								}
								transStr += `<h5>搭乘<strong>${line.title}</strong>（<em>${line.duration}</em>分钟）</h5>`; // 显示搭乘指引
								transStr += `<p>上车站：${line.geton.title}</p>`;
								transStr += `<p>下车站：${line.getoff.title}</p>`;
							});
						}
					});
					polylineLayer.updateGeometries([
						{
							styleId: "style_blue",
							rainbowPaths: rainbowPaths,
						},
					]);

					instructionContainer.innerHTML = transStr;
				});
		}

		var szsBtn = document.querySelector("#roadSZS");
		var sznBtn = document.querySelector("#roadSZN");
		var szFTBtn = document.querySelector("#roadFT");
		var szBABtn = document.querySelector("#roadBA");
		var skBtn = document.querySelector("#roadSK");
		var szuBtn = document.querySelector("#roadSZU");

		var endPosition = new TMap.LatLng(22.553443, 114.24181); // 路线规划终点
		szsBtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.53168, 114.117209); // 路线规划起点

			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});
		sznBtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.610563, 114.030311); // 路线规划起点
			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});
		szFTBtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.537952, 114.056851); // 路线规划起点
			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});
		szBABtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.629533, 113.815882); // 路线规划起点
			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});
		szuBtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.532742, 113.936696); // 路线规划起点
			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});
		skBtn.addEventListener("click", (e) => {
			var startPosition = new TMap.LatLng(22.47571, 113.913151); // 路线规划起点
			!!map && map.destroy();
			initRoadMap(startPosition, endPosition);
		});

		!!map && map.destroy();
		initMap();
	}

	/* nav btn event */
	navBarsBtn = document.querySelector(".nav__bars");
	navList = document.querySelector(".nav__list");
	var navCollapse = true;
	navBarsBtn.addEventListener("click", () => {
		if (navCollapse) {
			navList.style.display = "block";
		} else {
			navList.style.display = "none";
		}
		navCollapse = !navCollapse;
	});

	/* Load Tencent Map */
	initApp();

	function initTagCloud(radius /* 标签云半径 */, tspeed /* 标签运动速度 */) {
		var radius = radius || 120; // 标签云半径
		var dtr = Math.PI / 180;
		var d = 300;
		var mcList = [];
		var active = false;
		var lasta = 1;
		var lastb = 1;
		var distr = true;
		var tspeed = tspeed || 2; //关键，这句是调试标签运动速度的
		var size = 250;
		var mouseX = 0;
		var mouseY = 0;
		var howElliptical = 1;
		var aA = null;
		var oDiv = null;

		var i = 0;
		var oTag = null;
		oDiv = document.getElementById("tag_cloud");
		aA = oDiv.getElementsByTagName("a");
		for (i = 0; i < aA.length; i++) {
			oTag = {};
			oTag.offsetWidth = aA[i].offsetWidth;
			oTag.offsetHeight = aA[i].offsetHeight;
			mcList.push(oTag);
		}
		sineCosine(0, 0, 0);
		positionAll();
		oDiv.onmouseover = function () {
			active = true;
		};
		oDiv.onmouseout = function () {
			active = false;
		};
		oDiv.onmousemove = function (ev) {
			var oEvent = window.event || ev;
			mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
			mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);
			mouseX /= 5;
			mouseY /= 5;
		};
		setInterval(update, 30);

		function update() {
			var a;
			var b;
			if (active) {
				a =
					(-Math.min(Math.max(-mouseY, -size), size) / radius) *
					tspeed;
				b =
					(Math.min(Math.max(-mouseX, -size), size) / radius) *
					tspeed;
			} else {
				a = lasta * 0.95;
				b = lastb * 0.95;
			}
			lasta = a;
			lastb = b;
			if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
				return;
			}
			var c = 0;
			sineCosine(a, b, c);
			for (var j = 0; j < mcList.length; j++) {
				var rx1 = mcList[j].cx;
				var ry1 = mcList[j].cy * ca + mcList[j].cz * -sa;
				var rz1 = mcList[j].cy * sa + mcList[j].cz * ca;
				var rx2 = rx1 * cb + rz1 * sb;
				var ry2 = ry1;
				var rz2 = rx1 * -sb + rz1 * cb;
				var rx3 = rx2 * cc + ry2 * -sc;
				var ry3 = rx2 * sc + ry2 * cc;
				var rz3 = rz2;
				mcList[j].cx = rx3;
				mcList[j].cy = ry3;
				mcList[j].cz = rz3;
				per = d / (d + rz3);
				mcList[j].x = howElliptical * rx3 * per - howElliptical * 2;
				mcList[j].y = ry3 * per;
				mcList[j].scale = per;
				mcList[j].alpha = per;
				mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
			}
			doPosition();
			depthSort();
		}

		function depthSort() {
			var i = 0;
			var aTmp = [];
			for (i = 0; i < aA.length; i++) {
				aTmp.push(aA[i]);
			}
			aTmp.sort(function (vItem1, vItem2) {
				if (vItem1.cz > vItem2.cz) {
					return -1;
				} else if (vItem1.cz < vItem2.cz) {
					return 1;
				} else {
					return 0;
				}
			});
			for (i = 0; i < aTmp.length; i++) {
				aTmp[i].style.zIndex = i;
			}
		}

		function positionAll() {
			var phi = 0;
			var theta = 0;
			var max = mcList.length;
			var i = 0;
			var aTmp = [];
			var oFragment = document.createDocumentFragment(); //随机排序
			for (i = 0; i < aA.length; i++) {
				aTmp.push(aA[i]);
			}
			aTmp.sort(function () {
				return Math.random() < 0.5 ? 1 : -1;
			});
			for (i = 0; i < aTmp.length; i++) {
				oFragment.appendChild(aTmp[i]);
			}
			oDiv.appendChild(oFragment);
			for (var i = 1; i < max + 1; i++) {
				if (distr) {
					phi = Math.acos(-1 + (2 * i - 1) / max);
					theta = Math.sqrt(max * Math.PI) * phi;
				} else {
					phi = Math.random() * Math.PI;
					theta = Math.random() * (2 * Math.PI);
				} //坐标变换
				mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
				mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
				mcList[i - 1].cz = radius * Math.cos(phi);
				var left =
					mcList[i - 1].cx +
					oDiv.offsetWidth / 2 -
					mcList[i - 1].offsetWidth / 2;
				var top =
					mcList[i - 1].cy +
					oDiv.offsetHeight / 2 -
					mcList[i - 1].offsetHeight / 2;
				aA[i - 1].style.transform =
					"translateX(" + left + "px)" + " translateY(" + top + "px)";
			}
		}

		function doPosition() {
			var l = oDiv.offsetWidth / 2;
			var t = oDiv.offsetHeight / 2;
			for (var i = 0; i < mcList.length; i++) {
				var left = mcList[i].cx + l - mcList[i].offsetWidth / 2;
				var top = mcList[i].cy + t - mcList[i].offsetHeight / 2;
				var scale = mcList[i].scale;
				aA[i].style.transform =
					"translateX(" +
					left +
					"px)" +
					" translateY(" +
					top +
					"px)" +
					" scale(" +
					scale +
					")";
				aA[i].style.filter =
					"alpha(opacity=" + 100 * mcList[i].alpha + ")";
				aA[i].style.opacity = mcList[i].alpha;
			}
		}

		function sineCosine(a, b, c) {
			sa = Math.sin(a * dtr);
			ca = Math.cos(a * dtr);
			sb = Math.sin(b * dtr);
			cb = Math.cos(b * dtr);
			sc = Math.sin(c * dtr);
			cc = Math.cos(c * dtr);
		}
	}

	/* hidden loading bg */
	(function ($) {
		var bgCover = $.querySelector(".bgCover");
		setTimeout(function () {
			bgCover.style.opacity = 0;

			setTimeout(function () {
				bgCover.style.display = "none";
				// bgCover.parentNode.removeChild(bgCover);
			}, 100);

			$.body.style.overflow = "auto";
			$.querySelector(".header__title").className += " animate__fadeInUp";
			$.querySelector(".header__description").className +=
				" animate__slideInRight";
		}, 100);
	})(document);

	if (window.innerWidth > 750) {
		/* Load tag cloud */
		let tagsDom = document.querySelector("#tag_cloud");
		!!mettingDocs.metting_topic &&
			mettingDocs.metting_topic.forEach((item) => {
				let a = document.createElement("a");
				a.innerHTML = item;
				tagsDom.appendChild(a);
			});

		initTagCloud(tagsDom.clientHeight * 0.5, 5);
	}
};
