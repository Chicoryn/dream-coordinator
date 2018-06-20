class Feature < ApplicationRecord
    belongs_to :network

    def as_json(options={})
        f = super(options)
        f[:data] = Base64.strict_encode64(self.data)
        f
    end
end
