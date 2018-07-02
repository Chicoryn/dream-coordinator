class Network < ApplicationRecord
    has_many :features
    has_many :games

    def as_json(options={})
        n = super(options)
        n[:number_of_features] = self.features.count
        n[:number_of_games] = self.games.count
        n[:number_of_preceding] = Feature.where('created_at <= ?', self.created_at).count

        n
    end
end
