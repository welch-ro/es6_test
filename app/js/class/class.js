{
	//类的基本定义和生成实例
	class Parent{
		constructor(name = 'las'){
			this.name = name;
		}
	}

	let v_parent = new Parent('v')
	//console.log('构造函数和实例', v_parent)
}

{
	//继承
	class Parent{
		constructor(name = 'las'){
			this.name = name;
		}
	}

	class Child extends Parent{
		getName() {
			this.name = '123';
			console.log('XXX'+this.name)
		}
	}

	let a = new Child();
	a.getName();
}

{
	//继承传递参数
	class Parent{
		constructor(name = 'las'){
			this.name = name;
		}
	}

	class Child extends Parent{
		constructor(name = 'child') {
			super(name);
			this.type = 'childType';
		}

		getName() {
			console.log('XXX1111'+this.name);
		}
	}

	let a = new Child('hell');
	a.getName()
}

{
	//getter, setter,
	class Parent{
		constructor(name = 'sdf') {
			this.name = name;
		}

		//设置读取longName属性时的操作
		get longName() {
			return this.name + '_wdsf'
		}

		set longName(value) {
			this.name = value
		}
	}	

	let v_p = new Parent();
	v_p.longName=2
	console.log(v_p.longName)
}

{
	//静态方法 是以static定义，并且调用的时候不能是实例去调用，要类本身
	class Parent{
		constructor(name = 'sdf') {
			this.name = name;
		}

		static tell() {
			console.log('静态')
		}
	}

	Parent.tell();
}