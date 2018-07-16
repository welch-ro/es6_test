{

	let obj = {
		time : '2017-12-01',
		name : 'net',
		_r : 123
	}

	let monitor = new Proxy(obj, {
		//拦截对象属性的读取，这里target就是obj对象数据, 调用的时候monitor.time这个time就是key
		get(target, key) {
			return target[key].replace('2017', '2018');
		},
		set(target, key, value) {
			if(target === 'name'){
				return target[key] = value;
			}else{
				return target[key];
			}
		},
		//拦截 key in object操作 ，不能拦截for in操作
		has(target, key) {
			//只暴露name
			if(key === 'name'){
				return target[key]
			}else{
				return false;
			}
		},

		//拦截delete
		deleteProperty(target, key) {
			//只能删除有_的属性
			if(key.indexOf('_') > -1){
				delete target[key];
				return true;
			}else{
				return target[key];
			}
		},

		//拦截Object.keys, Object.getOwnPropertySymbols, Object.getOwnPropertyNames
		ownKeys(target) {
			return Object.keys(target).filter(item => item != 'time')
		}
	})

	// console.log('get', monitor.time)

	// monitor.time = '123123';
	// console.log('set', monitor.time)

	// for(var i in monitor){
	// 	console.log('has', monitor[i])
	// }

	//console.log('time' in monitor)

	// delete monitor._r;
	// console.log(monitor)

	console.log(Object.keys(monitor))
}

{
	let obj = {
		time : '2017-12-01',
		name : 'net',
		_r : 123
	}

	//Reflect的方法跟Proxy的方法一样
	console.log('reflect', Reflect.get(obj, 'time'))
	console.log('reflect', Reflect.set(obj, 'name', '2321'));
	console.log(obj)
	console.log('reflect', Reflect.has(obj, 'name'));
}

{
	function validator(target, validator){
		return new Proxy(target, {
			_validator : validator,
			set(target, key, value, proxy){
				if(target.hasOwnProperty(key)){
					let va = this._validator[key];
					if(!!va(value)){						
						return Reflect.set(target, key, value, proxy)
					}else{
						throw Error(`不能设置${key}到${value}`)
					}
				}else{
					throw Error(`${key}不存在`)
				}
			},

			get(target, key) {
				if(key === 'age'){
					target[key] = ~~target[key] + 2;
					return Reflect.get(target, key)
				}
			}
		})
	}

	const personValidators = {
		name(val) {
			return typeof val === 'string'
		},
		age(val) {
			return typeof val === 'number';
		}
	}

	class Person{
		constructor(name, age){
			this.name = name;
			this.age = age;
			return validator(this, personValidators)
		}
	}

	let person = new Person('lou', 30);
	console.log(person);
	person.age = 2.21111111;
	console.log(person.age);
}