var toArray = exports.toArray = function(m){
	return m.slice(0, -2).split(';\n');
};

function set(o, path, value){
	var key = path.pop(),
		current;

	for (var i = 0, l = path.length; i < l; i++){
		current = path[i];
		o = current in o ? o[current] : (o[current] = {});
	}
	o[key] = value;
}

exports.toDeepObjectOld = function(m){
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

exports.toDeepObject = function(m){
	var obj = {},
		list = toArray(m),
		message, value, o, key, focus;

	for (var i = 0, l = list.length; i < l; i++){
		message = list[i].split(' ');
		value = message.pop();
		key = message.pop();
		o = obj;
		for (var ii = 0, ll = message.length; ii < ll; ii++){
			focus = message[ii];
			o = focus in o ? o[focus] : (o[focus] = {});
		}
		o[key] = isNaN(value) ? value : Number(value);
	}
	return obj;
};

exports.toObject = function(m){
	var o = {},
		list = toArray(m),
		clip;

	for (var i = 0, l = list.length; i < l; i++){
		// split into an array at first white space
		clip = list[i].match(/^(\S+)\s(.*)$/);
		if (clip == null) o[list[i]] = null;
		else o[clip[1]] = !isNaN(clip[2]) ? Number(clip[2]) : clip[2];
	}
	return o;
};


function toFUDI(o){
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
		clip = toFUDI(o[p]);

		if (/number|string/.test(typeof clip)) bag.push([p, clip].join(' '));
		else for (var pp in clip){
			bag.push([p, clip[pp]].join(' '));
		}
	}
	return (bag.length == 0) ? null : bag;
}

exports.toFUDI = function(o){
	if (o == null) return null;
	var bag = [], clip;
	if (!Array.isArray(o)) bag = toFUDI(o);
	else for (var p in o){
		clip = toFUDI(o[p]);
		if (clip != null) bag = bag.concat(clip);
	}
	if (bag == null || bag.length == 0) return null;
	else return (Array.isArray(bag) ? bag.join(';\n') : bag) + ';\n';
};