class Game < ApplicationRecord
    belongs_to :network

    after_create :update_denormalized_network

    def update_denormalized_network
        network = self.network
        network.increment!(:number_of_games, 1)
    end
end
