requirejs.config({
    baseUrl: '/Areas/SiteAdmin/Assets/',
    paths: {
        'async': 'Plugins/requirejs/plugins/async',
        'jquery': 'Plugins/jquery/jquery-1.11.1.min',
        'menu': 'Plugins/menu/jquery.menu',
        'systemalt': 'Plugins/systemalt/jquery.systemalt',
        'query': 'Plugins/query/jquery.query.js',
        'validator': 'Plugins/validator/jquery.validator.js',
        'validatorcn': 'Plugins/validator/local/zh_CN.js',
    }
});

require(['jquery', 'menu', 'systemalt', 'query', 'validator'], function ($) {
    
    
});