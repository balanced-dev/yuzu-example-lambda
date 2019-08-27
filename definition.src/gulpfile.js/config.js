const prettyjson = require('prettyjson');

var projectName = 'Lambda';	

base = {
	devRoot: './_dev',
	devSource: './_dev/_source',
	devCompiled: './_dev/_client',
	devTemplates: './_dev/_templates',
	distRoot: '../delivery.src/'+ projectName,
	distClient: '../delivery.src/'+ projectName + '/_client',
	distTemplates: '../delivery.src/'+ projectName + '/_templates',
};

paths = {
	styles: {
		src: base.devSource + '/styles/scss',
		partials: base.devSource + '/styles/scss/partials',
		dest: base.devCompiled + '/styles/',
		dist: base.distClient + '/styles/'
	},
	images: {
		src: base.devSource + '/img/',
		dest: base.devCompiled + '/img/',
		dist: base.distClient + '/img/'
	},
	js: {
		src: base.devSource + '/js',
		dest: base.devCompiled + '/js/',
		dist: base.distClient + '/js/'
	},
	libraryStyles: {
		src: base.devSource + '/css',
		dest: base.devCompiled + '/css/',
		dist: base.distClient + '/css/'
	},
	handlebars: {
		data: {
			layout: base.devTemplates + '/src/_layouts/',
			templates: base.devTemplates + '/data/',
			dist: base.distTemplates + '/data/'
		},
		layout: {
			src: base.devTemplates + '/layouts/'
		},
		blocks: {
			src: base.devTemplates + '/src/blocks/'
		},
		pages: {
			src: base.devTemplates + '/src/',
			dest: base.devTemplates + '/html/',
			dist: base.distTemplates
		},
		paths: {
			dist: base.distTemplates + '/paths/'
		},
		schema: {
			dist: base.distTemplates + '/schema/'
		},
		xml: {
			dest: base.devTemplates
		}
	}
};

files = {
	partialscss: base.devTemplates + '/**/*.scss',
	scssSetup: paths.styles.src + '/**/*.scss',
	styles: paths.styles.src + '/frontend.scss',
	stylesBackOffice: paths.styles.src + '/backoffice.scss',
	stylesheets: paths.styles.dest + '/*.css',
	css: paths.styles.dest + '/style.css',
	cssDist: paths.styles.dist + '/style.css',
	html: paths.handlebars.pages.dest + '/**/*.html',
	templateLayoutData: paths.handlebars.data.layout + 'layout.json',
	templateLayouts: paths.handlebars.layout.src,
	templateData: paths.handlebars.data.templates,
	templatePartials: paths.handlebars.blocks.src,
	templatePages: paths.handlebars.pages.src,
	templateHTML: paths.handlebars.pages.dest,
	templateXML: paths.handlebars.xml.dest,
  	html: paths.handlebars.pages.dest+ '**/*.html'
};

/*  Display files ouput */
var showPaths = (done) => {

	var options = {
		keysColor: 'green',
		dashColor: 'red',
		stringColor: 'white',
		indent: 4
	}

	console.log('Base');
	console.log(prettyjson.render(base, options));
	console.log('Paths');
	console.log(prettyjson.render(paths, options));
	console.log('Files');
	console.log(prettyjson.render(files, options));

	done();
};

exports.base = base;
exports.paths = paths;
exports.files = files;
exports.showPaths = showPaths;
