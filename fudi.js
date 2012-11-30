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

exports.fromFUDI = function(m){
	return m.split(';\n');
};
