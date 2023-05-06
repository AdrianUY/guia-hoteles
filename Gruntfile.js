                module.exports = function (grunt){
                    require('time-grunt')(grunt);
                    require('jit-grunt')(grunt, {
                        useminPrepare: 'grunt-usermin'
                    });
                    grunt.initConfig({
                        sass: {
                            dist:{
                                files: [{
                                expand: true,
                                cwd: 'css',
                                src: ['*.scss'],
                                dest: 'css',
                                ext: '.css',
                            }]
                        }
                    },
                    wath: {
                        files: ['css/*.scss'],
                        task: ['css']
                    },
                    browserSync: {
                        dev: {
                            bsFiles: {//browser files 
                                src: [
                                    'css/*.css',
                                    '*.html',
                                    'js/*.js'
                                ]
                            },
                            options: {
                                wathTask: true,
                                server: {
                                    baseDir: './' //Directorio base para nustro servidor
                                }
                            }
                        },
                        imagemin: {
                            dynamic: {
                                files: [{
                                    expand: true,
                                    cwd: './',
                                    src: 'img/*.{png,gif,jpg,jpeg}',
                                    dest: 'dist/'
                                }]
                            }
                        },
                        copy: {
                            html: {
                                files: [{
                                    expand: true,
                                    dot: true,
                                    cwd: './',
                                    src: ['*.html'],
                                    dest: 'dist'
                                }]
                            },
                        },
                        clean: {
                            build: {
                            src: ['dist/']
                            }
                            },
                            cssmin: {
                                dist: {}
                            },
                            uglyfy: {
                                dist: {}
                        },
                        fileserv: {
                            options: {
                                encoding: 'utf8',
                                algorithm: 'md5',
                                length: 20
                            },
                            concat: {
                                options: {
                                    separator: ';'
                                },
                                useminPrepare: {
                                    foo: {
                                        dest: 'dist',
                                        src: ['index.html', 'about.html', 'precios.html', 'contacto.html']
                                    },
                                    options: {
                                        flow: {
                                            steps: {
                                                css: ['cssmin'],
                                                js: ['uglify']
                                            },
                                            post: {
                                                css: [{
                                                    name: 'cssmin',
                                                    createConfig: function(context, block){
                                                        var generated = context.options.generated;
                                                        generated.options = {
                                                            keepSpecialComments: 0,
                                                            rebase: false
                                                        }
                                                    }
                                                }]
                                            }
                                        }
                                    }
                                },
                                usemin: {
                                    html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contacto.html'],
                                    options: {
                                        assetsDir: ['dist', 'dist/css', 'dist/js']
                                    }
                                }
                            }}}
                    });


                    
                    grunt.loadNpmTask('grunt-contrib-watch');
                    grunt.loadNpmTask('grunt-contrib-sass');
                    grunt.loadNpmTask('grunt-breowser-sync');
                    grunt.loadNpmTask('grunt-contrib-imagemin');
                    grunt.registerTask('css', ['sass']);
                    grunt.registerTask('default', ['browserSync', 'watch'])
                    grunt.registerTask('img:compress',['imagemin']);
                    grunt.registerTask('build', [
                        'clean',
                        'copy',
                        'imagemin',
                        'useminPrepare',
                        'concat',
                        'cssmin',
                        'uglify',
                        'filerev',
                        'usemin',
                    ])
                };
