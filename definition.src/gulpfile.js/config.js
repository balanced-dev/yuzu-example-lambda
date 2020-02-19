const prettyjson = require('prettyjson');

const projectName = 'Lambda';	

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
	fonts: {
		src: base.devSource + '/fonts',
		dest: base.devCompiled + '/fonts/',
		dist: base.distClient + '/fonts/'
	},
	handlebars: {
		data: {
			layout: base.devTemplates + '/_layouts/',
			templates: base.devTemplates + '/data/',
			dist: base.distTemplates + '/data/'
		},
		layout: {
			src: base.devTemplates + '/_layouts/'
		},
		dataStuctures: {
			src: base.devTemplates + '/_dataStructures/'
		},
		blocks: {
			src: base.devTemplates + '/blocks/'
		},
		pages: {
			src: base.devTemplates + '/',
			dest: base.devCompiled + '/html/',
			dist: base.distTemplates
		},
		paths: {
			dist: base.distTemplates + '/paths/'
		},
		schema: {
			dist: base.distTemplates + '/schema/'
		},
		templates: {
			src: base.devTemplates + '/',
			dest: base.devCompiled + '/html/',
			dist: base.distTemplates,
			distHtml: base.distClient + '/html/'
		}
	},
	images: {
		src: base.devSource + '/images',
		dest: base.devCompiled + '/images/',
		dist: base.distClient + '/images/'
	},
	js: {
		src: base.devSource + '/js',
		dest: base.devCompiled + '/js/',
		dist: base.distClient + '/js/'
	},
	styles: {
		src: base.devSource + '/styles/scss',
		dest: base.devCompiled + '/styles/',
		dist: base.distClient + '/styles/'
	}
};

files = {
	partialsScss: base.devTemplates + '/**/*.scss',
	scssSetup: paths.styles.src + '/**/*.scss',
	styles: paths.styles.src + '/frontend.scss',
	stylesBackOffice: paths.styles.src + '/backoffice.scss',
	stylesheets: paths.styles.dest + '/*.css',
	css: paths.styles.dest + '/style.css',
	cssDist: paths.styles.dist + '/style.css',
	images: paths.images.src + '/**/*',
	fonts: paths.fonts.src + '/**/*',
	html: paths.handlebars.pages.dest + '/**/*.html',
	js: paths.js.src + '/site/**/*.js',	
	partialJs: base.devTemplates + '/**/*.js',
	templateLayoutData: paths.handlebars.data.layout + 'layout.json',
	templateLayouts: paths.handlebars.layout.src,
	templateData: paths.handlebars.data.templates,
	templatePartials: [paths.handlebars.dataStuctures.src, paths.handlebars.blocks.src],
	templates: paths.handlebars.templates.src,
	templateHTML: paths.handlebars.templates.dest,
  	html: paths.handlebars.templates.dest+ '**/*.html'
};

/*  Display files ouput */
const showPaths = (done) => {

	const options = {
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
