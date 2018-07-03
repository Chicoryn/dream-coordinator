class Network < ApplicationRecord
    has_many :features
    has_many :games

    before_create :initialize_denormalized

    def initialize_denormalized
        self.number_of_games = self.games.count
        self.number_of_features = self.features.count
        self.number_of_preceding = Feature.where('`created_at` <= ?', self.created_at).count
    end
end
