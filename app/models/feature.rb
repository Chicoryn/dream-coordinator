class Feature < ApplicationRecord
    belongs_to :network

    after_create :update_denormalized_network

    def update_denormalized_network
        network = self.network
        network.increment!(:number_of_features, 1)

        following = Network.where('`created_at` >= ?', self.created_at)
        following.update_all('`number_of_preceding` = `number_of_preceding` + 1')
    end

    def as_json(options={})
        f = super(options)
        f[:data] = Base64.strict_encode64(self.data)
        f
    end
end
