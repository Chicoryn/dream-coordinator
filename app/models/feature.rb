class Feature < ApplicationRecord
    belongs_to :network

    after_create :update_denormalized_network

    def update_denormalized_network
        network = self.network
        network.increment!(:number_of_features, 1)

        following = Network.where('`created_at` >= ?', self.created_at)
        following.update_all('`number_of_preceding` = `number_of_preceding` + 1')
    end

    def to_json
        f = StringIO::new()
        f << '{'
        f << '"id":'
        f << self.id.to_s
        f << ','
        f << '"network_id":'
        f << self.network_id.to_s
        f << ','
        f << '"data":'
        f << Base64.strict_encode64(self.data || '')
        f << '}'
        f.string
    end
end
