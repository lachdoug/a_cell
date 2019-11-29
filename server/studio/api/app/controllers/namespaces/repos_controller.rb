module Server
  class Api
    module App
      module Controllers

        get '/namespaces/:id/repo' do
          content_type :'application/json'
          Namespace.find( params[:id] ).repo.to_json
        end

        get '/namespaces/:id/repo/branch' do
          content_type :'application/json'
          Namespace.find( params[:id] ).repo.branch.to_json
        end

        post '/namespaces/:id/repo/reset' do
          content_type :'application/json'
          Namespace.find( params[:id] ).repo.reset.to_json
        end

        post '/namespaces/:id/repo/branch/set' do
          content_type :'application/json'
          Namespace.find( params[:id] ).repo.branch.set( params[:name] ).to_json
        end

        post '/namespaces/:id/repo/branch/remove' do
          content_type :'application/json'
          Namespace.find( params[:id] ).repo.branch.remove( params[:name] ).to_json
        end

      end
    end
  end
end