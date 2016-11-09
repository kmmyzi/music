$(function(){
	var play=$(".play");
	var audio=$("#audio").get(0);
	var progress=$(".progress");
	var circle=$(".circle");
	var current=$(".current");
	var duration=$(".duration");
	var left=0;
	var width=progress.width();
	var currentIndex=0;
	var now;
	var music=[
	 {
	 	name:"年轮",
	 	zuozhe:"张碧晨",	 	
	 	src:"./music/n.mp3"
	 },
	 {
	 	name:"曹操",
	 	zuozhe:"林俊杰",	 	
	 	src:"./music/c.mp3"
	 }
	]
	if(!localStorage.music){
	localStorage.music=JSON.stringify(music);
}
	music=JSON.parse(localStorage.music);
        //上一首
	function prev(){
		currentIndex-=1;
		if(currentIndex<0){
			currentIndex=$(".lists").children("li").length-1;
		}
		render(music,$(".lists"));
        return false;
	}
	//下一首
	function next(){
		currentIndex+=1;
		if(currentIndex>=$(".lists").children("li").length){
			currentIndex=0;
		}
		render(music,$(".lists"));
        return false;
	}
	$(".prev").on("touchend",prev);
	$(".next").on("touchend",next);
	render(music,$(".lists"))
	//播放暂停事件
	play.on("touchend",function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
		return false;
	})
	//时间格式函数
	function promt(v){
		var v=Math.floor(v);
		var s=v%60;
		s=(s<10)?"0"+s:s;
		var m=Math.floor(v/60);
		return (m+":"+s);
	}
     //进度条跳转
	circle.on("touchend",false);
	progress.on("touchend",function(e){
		left=e.originalEvent.changedTouches[0].clientX-progress.offset().left;
		audio.currentTime=audio.duration* left/progress.width();
		return false;
	})
	//进度条拖拽
	circle.on("touchstart",function(e){
			ox=e.originalEvent.changedTouches[0].clientX-circle.offset().left;
		var start=circle.width()/2-ox;
		$(document).on("touchmove",function(e){
			var left1=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
				if(left1>=progress.width()||left1<=0){
					return;	
				}
			audio.currentTime=left1/progress.width()*audio.duration;
		})
		return false;
	});
	circle.on("touchend",function(){
		$(document).off("touchmove");
		return false;
	})
	//audio的各个事件
	$(audio).on("loadstart",function(){
		$(".lists p").html(music[currentIndex].name);
	})
	$(audio).on("canplay",function(){
		audio.play();
		$(".lists p").html(music[currentIndex].name);
		duration.html(promt(audio.duration));
	})
	$(audio).on("progress",function(){
	})
	$(audio).on("play",function(){
		play.html("&#xe627;");
	})
	$(audio).on("timeupdate",function(){
		current.html(promt(audio.currentTime));
		var r=circle.width()/2;
		var width=progress.width();
		left=audio.currentTime/ audio.duration * width-r;
		circle.css("left",left);
	})
	$(audio).on("pause",function(){
		play.html("&#xe64e;");
	})
	$(audio).on("seek",function(){
	})
	$(audio).on("ended",function(){
	})
	//返回列表页
    $(".headl").on("touchend",function(){
    	$(".list1").css("display","block");
    	$(".playmusic").css("display","none");
    	return false;
    })
    //列表页列表
    function render(obj,obj2){			
		obj2.empty();
		for(var i=0;i<obj.length;i++){
			if(i==currentIndex){				
				d="active"
			}else{
				d=""
			}
			$("<li class='"+d+"'><a href=''>&#xe612;</a><p>"+obj[i].name+"</p><a href=''class='tiao'>></a></li>").appendTo(".lists");
		}
	}
    render(music,$(".lists"));
    //列表页list
    $(".lists").on("touchend","li",function(){	
		var index=$(this).index();
		if(index==currentIndex){
			if(audio.paused){
				audio.play();
			}
			else{
				audio.pause()
			}
			return;
		}
		currentIndex=index;
		render(music,$(".lists"));
		return false;
	})
    //列表页选项卡转换
    var lis=$(".ul li");
    $(".ul li").on("touchend",function(){
    	var index=$(this).index();
    	lis.removeClass("active");
		$(this).addClass("active");
		if(index==0){
			$(".lists").css("display","block");
			$(".lists1").css("display","none");
		}else if(index==1){
			$(".lists").css("display","none");
			$(".lists1").css("display","block");
		}
    })
    //列表页->播放页
    $(".lists").on("touchend",".tiao",function(){
    	$(".list1").css("display","none");
    	$(".playmusic").css("display","block");
    	return false;
    })
	//删除函数
	function deletes(){
		if(now==currentIndex){
			music.splice(now,1)
			localStorage.s=JSON.stringify(music);
			render(music,$(".glist"));
		    render1(music,$(".lists"));
		}
		if(now<currentIndex){
			currentIndex--;
			music.splice(now,1)
			localStorage.s=JSON.stringify(music);
			render(music,$(".glist"));
		    render1(music,$(".lists"));
		}
		if(now>currentIndex){
			music.splice(now,1)
			localStorage.s=JSON.stringify(music);
			render(music,$(".glist"));
		    render1(music,$(".lists"));
		}
	}
	//播放列表删除
	  $(".gcaozuo li").on("touchend",function(){
    	var dd=$(this).index();
    	if(dd==1){
    		now=currentIndex;
    		deletes();
        return false;
    	}
   })
	  //列表页添加
	  $(".new").on("touchend",function(){
        var arr=[
        {
	 	name:"小酒窝",
	 	zuozhe:"林俊杰",
	 	src:"./list/小酒窝.mp3",
	 	content:"[00:01.56] 《小酒窝》 林俊杰[00:03.89] 作曲：林俊杰 填词：王雅君 [00:04.69] 烂熊制作，最爱俊杰 [00:10.78] 我还在寻找 一个依靠和一个拥抱 [00:20.32] 谁替我祈祷 替我烦恼 为我生气为我闹 [00:30.47] 幸福开始有预兆 缘分让我们慢慢紧靠 [00:39.49] 然后孤单被吞没了 无聊变得有话聊 有变化了 [00:49.81]（合）小酒窝长睫毛 是你最美的记号 [00:55.16] 我每天睡不着 想念你的微笑 [01:00.28] 你不知道 你对我多么重要 [01:05.65] 有了你生命完整的刚好 [01:10.13] 小酒窝长睫毛 迷人得无可救药 [01:15.51] 我放慢了步调 感觉像是喝醉了 [01:21.13] 终于找到 心有灵犀的美好 [01:26.00] 一辈子暖暖的好 我永远爱你到老 [01:44.09]幸福开始有预兆 缘分让我们慢慢紧靠 [01:52.76] 然后孤单被吞没了 无聊变得有话聊 有变化了 [02:03.09]（合）小酒窝长睫毛 是你最美的记号 [02:08.35] 我每天睡不着 想念你的微笑 [02:13.36] 你不知道 你对我多么重要 [02:18.96] 有了你生命完整的刚好 [02:23.50] 小酒窝长睫毛 迷人得无可救药 [02:28.56] 我放慢了步调 感觉像是喝醉了 [02:34.00] 终于找到 心有灵犀的美好 [02:39.58] 一辈子暖暖的好 我永远爱你到老 [02:52.16] 小酒窝长睫毛 迷人得无可救药 [03:02.82] 我放慢了步调 感觉像是喝醉了 [03:08.60] 终于找到 心有灵犀的美好 [03:14.18]一辈子暖暖的好 我永远爱你到老 "
	 },
	 {
	 	name:"黄玲鸟与蜗牛",
	 	zuozhe:"儿童",	 	
	 	src:"./list/黄玲鸟与蜗牛.mp3",
	 	content:"[00:09.96]阿门阿前一棵葡萄树[00:12.45]阿嫩阿嫩绿地刚发芽[00:14.89]蜗牛背著那重重的壳呀[00:17.48]一步一步地往上爬[00:19.67]阿树阿上两只黄鹂鸟[00:22.00]阿嘻阿嘻哈哈在笑它[00:24.59]葡萄成熟还早地很哪[00:27.18]现在上来干什么[00:29.42]阿黄阿黄鹂儿不要笑[00:31.60]等我爬上它就成熟了[00:36.93]阿门阿前一棵葡萄树[00:39.17]阿嫩阿嫩绿地刚发芽[00:41.71]蜗牛背著那重重的壳[00:44.21]一步一步地往上爬[00:46.65]阿树阿上两只黄鹂鸟[00:49.09]阿嘻阿嘻哈哈在笑它[00:51.53]葡萄成熟还早地很哪[00:53.96]现在上来干什么[00:56.62]阿黄阿黄鹂儿不要笑[00:59.21]等我爬上它就成熟了[01:23.75]阿门阿前一棵葡萄树[01:25.93]阿嫩阿嫩绿地刚发芽[01:27.71]蜗牛背著那重重的壳呀[01:31.11]一步一步地往上爬[01:33.45]阿树阿上两只黄鹂鸟[01:35.33]阿嘻阿嘻哈哈在笑它[01:37.46]葡萄成熟还早地很哪[01:39.75]现在上来干什么[01:42.95]阿黄阿黄鹂儿不要笑[01:45.13]等我爬上它就成熟了"
	 },
	 {
	 	name:"白天不懂夜的黑",
	 	zuozhe:"那英",	 	
	 	src:"./list/白天不懂夜的黑.mp3",
	 	content:"[00:11.74]白天不懂夜的黑[00:17.10]那英[00:21.26]我们之间没有延伸的关系 [00:25.19]没有相互占有的权利 [00:32.08]只在黎明混着夜色时 [00:38.97]才有浅浅重叠的片刻 [00:46.85]白天和黑夜只交替没交换 [00:52.98]无法想像对方的世界 [01:00.52]我们仍坚持各自等在原地 [01:06.64]把彼此站成两个世界 [01:16.16]你永远不懂我伤悲 [01:19.88]像白天不懂夜的黑 [01:23.27]像永恒燃烧的太阳 [01:26.88]不懂那月亮的盈缺 [01:30.16]你永远不懂我伤悲 [01:33.44]像白天不懂夜的黑 [01:37.15]不懂那星星为何会坠跌 [01:45.14]白天和黑夜只交替没交换 [02:21.56]无法想像对方的世界 [02:29.00]我们仍坚持各自等在原地 "
	 }];
        $.each(arr,function(index,val){
		      music.push(arr[index]);
		    })
		localStorage.s=JSON.stringify(music);
		render(music,$(".glist"));
		render1(music,$(".lists"));
		return false;
    })	
})