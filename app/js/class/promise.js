{
	//es5的方法
	let ajax = function(cb){
		//执行
		console.log('执行');
		setTimeout(() => {
			cb();
		},2000)
	}
	ajax(function(){
		console.log('timeout1')
	})
}

{
	let ajax = function(){
		console.log('执行2');
		return new Promise(function(resolve, reject){
			setTimeout(() =>{
				resolve();
			},2000)
		})
	}

	ajax().then(function(){
		console.log('timeout2')
	})
}

{
	//多个回调
	let ajax = function(){
		console.log('执行3');
		return new Promise(function(resolve, reject){
			console.log('执行3-1');
			setTimeout(() =>{
				resolve();
			},2000)
		})
	}

	ajax().then(function(){
		console.log('执行3-2');
		return new Promise(function(resolve, reject){
			console.log('执行3-2-1');
			setTimeout(() => {
				console.log('time3-2');
				resolve()
			},1000)
		})
	}).then(function(){
		console.log('执行3-3');
		return new Promise(function(resolve, reject){
			console.log('执行3-3-1');
			setTimeout(() => {
				console.log('time3-3');
				resolve()
			},1000)
		})
	}).then(function(){
		console.log('执行3-3');
		console.log('time3-4')
	})
}

{
	//捕获错误
	let ajax = function(num){
		console.log('执行4');
		return new Promise(function(resolve, reject){
			if(num < 5){
				resolve()
			}else{
				throw new Error('参数值不得低于5')
			}
		})
	}

	ajax(6).then(function(){

	}).catch(function(err){
		console.log('错误了', err)
	})
}

{
	//图片加载完成后再显示
	function loadImg(src){
		return new Promise((resolve, reject) => {
			let img_ele = document.createElement('img');
			img_ele.src = src;			
			img_ele.onload = function(){
				console.log(img_ele)
				resolve(img_ele);
			}
			img_ele.onerror = function(err){
				reject(err);
			}
		})
	}

	function showImg(imgs){		
		document.body.appendChild(imgs);
	}

	loadImg('http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg').then(showImg);
}

{
	//多个图片加载完成后再显示
	function showImg(imgs){	
		imgs.forEach(function(item){
			let img_ele = document.createElement('img');
			img_ele.src = item;			
			document.body.appendChild(img_ele);
		})			
	}

	Promise.all([
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg',
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhSABQz-AAEMmT5alLw574.jpg',
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzjCAGwQfAAAsb4v5IpM814.jpg'
	]).then(showImg)
	
}

{
	//promice race方法，多个异步，哪个先到就用哪个，慢得就不要了

	function loadImg(src){
		return new Promise((resolve, reject) => {
			let img_ele = document.createElement('img');
			img_ele.src = src;			
			img_ele.onload = function(){
				resolve(img_ele);
			}
			img_ele.onerror = function(err){
				reject(err);
			}
		})
	}

	function showImg(imgs){
		let img_ele = document.createElement('img');
			img_ele.src = imgs;			
		let p_ele = document.createElement('p');
		p_ele.appendChild(img_ele);	
		document.body.appendChild(p_ele);		
	}

	Promise.race([
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg',
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhSABQz-AAEMmT5alLw574.jpg',
		'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzjCAGwQfAAAsb4v5IpM814.jpg'
	]).then(showImg)
	
}

{
	// console.log("1");
	// setTimeout(()=>{
	//     console.log(2)
	//     Promise.resolve().then(()=>{
	//         console.log(3);
	//         process.nextTick(function foo() {
	//             console.log(4);
	//         });
	//     })
	// })
	// Promise.resolve().then(()=>{
	//     console.log(5);    
	//     setTimeout(()=>{
	//         console.log(6)
	//     })
	//     Promise.resolve().then(()=>{
	//         console.log(7);
	//     })
	// })

	// process.nextTick(function foo() {
	//     console.log(8);
	//     process.nextTick(function foo() {
	//         console.log(9);
	//     });
	// });
	// console.log("10")
}

{
	//promise建立后就会立即执行，then里的方法，只有同步的代码都结束后，才会执行

	setTimeout(function(){console.log('t4')},0)
	let promise = new Promise((resolve, reject) =>{
		console.log('t1');
		resolve()
	})

	promise.then(function(){
		console.log('t_resolve')
	});

	function test(num){
		for(let i = 0; i < num; i++){

		}
		console.log('t2')
	}
	test(100000);
	console.log('t3');

}


{

}