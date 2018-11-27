# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Live reload
# use: https://github.com/middleman/middleman-livereload
activate :livereload

activate :external_pipeline,
         name: :webpack,
         command: build? ? "npm run build:assets" : "npm run start:assets",
         source: build? ? ".tmp/webpack_build" : ".tmp/webpack_output",
         latency: 1

set :js_dir, 'assets/js'
set :css_dir, 'assets/css'

# activate :i18n

activate :i18n, :langs => [:en]
# activate :i18n, :langs => [:en, :"zh-CN"]

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end
require "lib/image_helpers"
require "lib/events_helpers"
require "lib/i18n_helpers"
require "lib/social_helpers"
helpers ImageHelpers
helpers EventsHelpers
helpers I18nHelpers
helpers SocialHelpers


# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css
  activate :minify_javascript

  # Append a hash to asset urls (make sure to use the url helpers)
  activate :asset_hash

  # Enable cache buster
  # see: https://github.com/middleman/middleman-guides/blob/master/source/advanced/improving-cacheability.html.markdown#cache-buster-in-query-string
  activate :cache_buster

  # Use relative URLs
  set :relative_links, true
  activate :relative_assets

  # Gzip HTML, CSS, and JavaScript
  # see: https://github.com/middleman/middleman-guides/blob/master/source/advanced/file-size-optimization.html.markdown#gzip-text-files
  activate :gzip
end
