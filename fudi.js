var toArray = exports.toArray = function(m){
	return m.slice(0, -2).split(';\n');
};

exports.encode = function(o){
	if (o == null) return null;
	var type = typeof o, bag = [];
	if (/string|number/.test(type)) return o + ';\n'

	for (var p in o){
		type = typeof o[p];
		bag.push([p, (type == 'boolean')
			? o[p]
				? 1 : 0
			: (/string|number/.test(type))
				? o[p]
				: Array.isArray(o[p])
					? o[p].join(' ')
					: o[p]
		].join(' '));
	}
	if (bag.length == 0) return null;
	else return bag.join(';\n') + ';\n';
};

exports.decode = function(m){
	var o = {},
		list = toArray(m),
		clip;

	for (var i = 0, l = list.length; i < l; i++){
		clip = list[i].match(/^(\S+)\s(.*)$/);
		if (clip == null) o[list[i]] = null;
		else o[clip[1]] = !isNaN(clip[2]) ? Number(clip[2]) : clip[2];
	}
	return o;
};

/*
function set(o, path, value){
	var key = path.pop(),
		current;

	for (var i = 0, l = path.length; i < l; i++){
		current = path[i];
		o = current in o ? o[current] : (o[current] = {});
	}
	o[key] = value;
}

exports.toObjectOld = function(m){
	var obj = {},
		list = toArray(m),
		value;

	for (var i = 0, l = list.length; i < l; i++){
		list[i] = list[i].split(' ');
		value = list[i].pop();
		set(obj, list[i], isNaN(value) ? value : Number(value));
	}
	return obj;
};
*/

exports.toObject = function(m){
	var obj = {},
		list = toArray(m),
		message, value, o, key, focus;

	for (var i = 0, l = list.length; i < l; i++){
		messages = list[i].split(' ');
		if (messages.length == 1){
			obj[messages[0]] = null;
			continue;
		}
		value = messages.pop();
		key = messages.pop();
		o = obj;

		for (var ii = 0, ll = messages.length; ii < ll; ii++){
			focus = messages[ii];
			o = focus in o ? o[focus] : (o[focus] = {});
		}
		o[key] = isNaN(value) ? value : Number(value);
	}
	return obj;
};

function fromObject(o){
	if (o == null) return null;
	var type = typeof o, bag = [], clip;

	if (type == 'boolean') return o ? 1 : 0;
	else if (/number|string/.test(type)) return o;

	if (Array.isArray(o)){
		if (o.length == 0) return null;
		else if (!o.some(function(item){
			return typeof item == 'object';
		})) return o.map(function(item){
			if (typeof item == 'boolean') return item ? 1 : 0;
			else return item;
		}).join(' ');
	}
	for (var p in o){
		clip = fromObject(o[p]);

		if (/number|string/.test(typeof clip)) bag.push([p, clip].join(' '));
		else for (var pp in clip){
			bag.push([p, clip[pp]].join(' '));
		}
	}
	return (bag.length == 0) ? null : bag;
}

exports.fromObject = function(o){
	if (o == null) return null;
	var bag = [], clip;
	if (!Array.isArray(o)) bag = fromObject(o);
	else for (var p in o){
		clip = fromObject(o[p]);
		if (clip != null) bag = bag.concat(clip);
	}
	if (bag == null || bag.length == 0) return null;
	else return (Array.isArray(bag) ? bag.join(';\n') : bag) + ';\n';
};



var Emitter = require('events').EventEmitter;

var Parser = exports.Parser = function(){
	if (!(this instanceof Parser)) return new Parser();
	this.parsers = {};
	this.on('newListener', this.add);
	return this;
};

Parser.prototype = Object.create(Emitter.prototype);

Parser.prototype.add = function(regex, callback){
	//this.parsers[regex] = new RegExp('(?:^|(;\n))' + regex + '([^;\n]?)+', 'g');
	//this.parsers[regex] = new RegExp('(?:^|;\n)' + regex + '(.*?)', 'g');
	this.parsers[regex] = new RegExp('(^|;\n)' + regex + '([^;\n]?)+', 'g');
	// .match(/(a b)(.*)[^;\n]/g)
	// 'a b 1;\na a b c 2;\na b 3'.match(/((?:^|(;\n))a b)/g)
};

Parser.prototype.parse = function(fudi){
	var result;
	
	for (var p in this.parsers){
		result = fudi.match(this.parsers[p]);
		if (result) console.log('result', p, result);
	}/*
	for (var i = 0, l = this.parsers.length; i < l; i++){
		// console.log(this.parsers[i]);
		result = fudi.match(this.parsers[i]);
		if (result) console.log('result', result);
	}*/
};

































