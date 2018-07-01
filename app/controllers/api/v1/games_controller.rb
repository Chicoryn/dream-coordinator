class Api::V1::GamesController < Api::V1::BaseController
    def index
        sort = params[:sort]&.permit(:id, :created_at, :updated_at, :category, :network_id)&.to_h || {created_at: :desc}

        respond_with Game.all
            .select([:id, :category, :data, :created_at])
            .where(params[:filter]&.permit(:id, :network_id, :category))
            .order(sort)
            .limit(params[:limit]&.to_i || 50)
    end

    def create
        @game = Game.new(params[:game]&.permit(:network_id, :category, :created_at, :data))
        @game[:data] = Base64.decode64(@game[:data])

        head @game.save ? :ok : :bad_request
    end
end
