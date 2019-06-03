---
layout: post
status: publish
published: true
title: How to redirect everything to a new domain except root page and WP directories
  for WordPress sites
author:
  display_name: Hazrul
  login: abanghazrul
  email: abanghazrul@gmail.com
  url: ''
author_login: abanghazrul
author_email: abanghazrul@gmail.com
wordpress_id: 3289
wordpress_url: https://www.hazrulazhar.com/?p=3289
date: '2018-06-27 23:24:15 +0800'
date_gmt: '2018-06-27 15:24:15 +0800'
categories:
- Tech
- WooCommerce
- WordPress
- Programming
tags: []
comments: []
---
If you ever run a WordPress site that was going to be decomissioned, and you needed to redirect everything to the new domain running a non-WordPress site to the new domain's root page, but you do not want to redirect the root page of your old domain and any WordPress directories, spare 2 hours of your life and 10 varieties of cuss words. Here's your answer.

Remove the following code in your .htaccess file:

<code>RewriteEngine On<br />
RewriteBase /<br />
RewriteRule ^index\.php$ - [L]<br />
RewriteCond %{REQUEST_FILENAME} !-f<br />
RewriteCond %{REQUEST_FILENAME} !-d<br />
RewriteRule . /index.php [L]<br />
</code>

And replace it with this [gist](https://gist.github.com/hazrulazhar/f7d4fa0eee178fc6f5d35bea25e3813a).

You're welcome.
