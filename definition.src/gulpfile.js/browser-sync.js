const config = require('./config');

var init = () => {

	$.browserSync({
		notify: false,
		server: {
			baseDir: config.base.devRoot,
			middleware: [
				{
					route: '/api',
					handle: $.yuzuDefinitionApi
				}
			],
			index: "templates.html"
		},
		open: true,
		ui: {
			port: 3001
		},
		ghostMode: false, // Causes issues with yuzu-def-ui (overlay)
		cors: true
	});

};

const reload = (done) => {
  $.browserSync.reload();
  done();
};

exports.init = init;
exports.reload = reload;

