class Api::V1::EvaluationGamesController < Api::V1::BaseController
    def index
        sort = params[:sort]&.permit(:id, :created_at, :updated_at)&.to_h || {created_at: :desc}

        respond_with EvaluationGame.all
            .select([:id, :data, :created_at])
            .where(params[:filter]&.permit(:id))
            .order(sort)
            .limit(params[:limit]&.to_i || 50)
    end

    def create
        @eval_game = EvaluationGame.new(params[:evaluation_game]&.permit(:created_at, :data))
        @eval_game[:data] = Base64.decode64(@eval_game[:data])

        head @eval_game.save ? :ok : :bad_request
    end
end
