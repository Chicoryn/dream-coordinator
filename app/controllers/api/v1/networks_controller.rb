class Api::V1::NetworksController < Api::V1::BaseController
    def index
        sort = params[:sort]&.permit(:id, :created_at, :updated_at, :elo)&.to_h || {created_at: :desc}

        respond_with Network.all
            .select([:id, :name, :elo, *(:data if params[:full]), :created_at, :updated_at])
            .where(params[:filter]&.permit(:id, :name))
            .order(sort)
            .limit(params[:limit]&.to_i)
    end

    def create
        @network = Network.new(params[:network]&.permit(:name, :data, :created_at))
        @network[:data] = Base64.decode64(@network[:data])

        head @network.save ? :ok : :bad_request
    end

    def update
        @network = Network.find_by_id(params[:id])
        status = @network.update_attributes(params[:network]&.permit(:elo))

        head status ? :ok : :bad_request
    end
end
