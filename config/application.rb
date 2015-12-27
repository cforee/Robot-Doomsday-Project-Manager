require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RdpmDemo
  class Application < Rails::Application

    config.assets.enabled = true
    config.assets.paths << Rails.root.join("app", "assets", "data")
    config.assets.paths << Rails.root.join("app", "assets", "data", "dialogue")
    config.assets.paths << Rails.root.join("app", "assets", "data", "levels")

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end
