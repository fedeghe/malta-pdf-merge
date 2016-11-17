require('malta').checkDeps('easy-pdf-merge');

var epm = require("easy-pdf-merge"),
	path = require('path'),
	fs = require('fs');

function malta_easyPdfMerge2(o, options) {

	var self = this,
		start = new Date(),
		msg,
		elements = [],
		sourceDir = path.dirname(o.name),
		destDir = path.dirname(self.tplPath),
		old = o.name,
        pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	elements = o.content.match(/\#\#([^\#\s]*)\#\#/gm);

	elements = elements.map(function (el, i) {
		// add right directory and cleanup regex results
		//
		return destDir + '/' + el.replace(/\#/g, '');
	});

	//exists?
	elements.map(function (el) {
		if (!fs.existsSync(el)) {
			self.log_err("easy-pdf-merge says:\n"+
				"please check " + old + " content because\n"+
				el + ' ' + 'does not exists'.underline()
			);
		}
	})

	o.name = (sourceDir + '/' + options.name) || o.name.replace(/\.pdf$/, '.merged.pdf');

	return function (solve, reject){
		epm(elements, o.name, function(err) {
			err && doErr(err);
			msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name+ ' (' + self.getSize(o.name) + ')';
			//unlink original malta output primary file
			fs.unlink(old);
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};	
}
malta_easyPdfMerge2.ext = 'txt';
module.exports = malta_easyPdfMerge2;