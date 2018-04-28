class Api::V1::NetworksController < Api::V1::BaseController
    def index
        @networks = Network.all
            .select([:id, :name, :created_at, :updated_at])
            .order([:created_at]).reverse_order

        respond_with @networks
    end

    def create
        respond_with :api, :v1, Network.create(
            params.permit(:name, :data)
        )
    end

    def destroy
        respond_with Network.destroy(params[:id])
    end

    def update
        network = Network.find(params[:id])
        network.update_attributes(
            params.permit(:name, :data)
        )

        respond_with network, :json => network
    end
end
