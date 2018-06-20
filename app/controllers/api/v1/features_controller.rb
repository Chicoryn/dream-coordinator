class Api::V1::FeaturesController < Api::V1::BaseController
    def index
        respond_with Feature.all
            .select([:id, :network_id, :data])
            .where(params[:filter]&.permit(:id, :network_id))
            .order([:created_at]).reverse_order
            .limit(params[:limit]&.to_i || 50)
    end

    def create
        @feature = Feature.new(params[:feature]&.permit(:network_id, :data, :created_at))
        @feature[:data] = Base64.decode64(@feature[:data])

        head @feature.save ? :ok : :bad_request
    end
end
