require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RdpmDemo
  class Application < Rails::Application

    config.assets.paths << "#{Rails.root}/app/assets/data"
    config.assets.paths << "#{Rails.root}/app/assets/data/dialogue"


    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end