require 'rubygems'
require 'bundler'
require 'json'
Bundler.require :default


conn = Mongo::Connection.new
db = conn['code-an']

get '/' do
  erb :index
end

get '/data/:analyzer' do
    content_type :json
    results = db[params[:analyzer]].find_one
    results["data"].to_json
end