<?php

// return [

//     /*
//     |--------------------------------------------------------------------------
//     | Cross-Origin Resource Sharing (CORS) Configuration
//     |--------------------------------------------------------------------------
//     |
//     | Here you may configure your settings for cross-origin resource sharing
//     | or "CORS". This determines what cross-origin operations may execute
//     | in web browsers. You are free to adjust these settings as needed.
//     |
//     | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//     |
//     */

//     'paths' => ['api/*', 'sanctum/csrf-cookie','storage/*'],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => ['*'],
    
//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     'supports_credentials' => true,

// ];


return [
    'paths' => ['api/*', 'storage/*', 'sanctum/csrf-cookie'], // Add the paths you want to allow

    'allowed_methods' => ['*'], // You can specify methods like ['GET', 'POST'] if needed

    'allowed_origins' => ['*'], // Add the React development server's URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // You can limit headers as needed

    'exposed_headers' => ['Content-Disposition', 'Content-Type'], // Expose content headers if necessary

    'max_age' => 0,

    'supports_credentials' => true, // Set this to true if you are sending cookies or other credentials
];

