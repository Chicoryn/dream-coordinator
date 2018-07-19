class Api::V1::FeaturesController < Api::V1::BaseController
    include ActionController::Live

    def index
        sort = params[:sort]&.permit(:id, :created_at, :updated_at, :network_id)&.to_h || {created_at: :desc}
        features = Feature
            .select([:id, :network_id, :data] + sort.keys)
            .where(params[:filter]&.permit(:id, :network_id))
            .order(sort)

        # do a custom lazy serialization of the feature objects, this is
        # necessary because we usually select a **huge** amount of them at a
        # time and without this the server is prune to running out of memory.
        #
        # this code is essentially a custom `find_each` that allows for ordering
        # over any unique column.
        remaining = params[:limit]&.to_i || 50
        prev_feature = nil

        response.status = 200
        response.content_type = 'application/json'
        response.stream.write "["

        while remaining > 0 do
            # set the offset using the sort index. We do this instead of using
            # the `offset` method since the later is not resilient against
            # parallel insertions.
            slice = features.limit([remaining, 50].min)

            sort.keys.each do |key|
                if sort[key] == 'asc'
                    slice = slice.where("`#{key}` >= ?", prev_feature[key])
                else
                    slice = slice.where("`#{key}` <= ?", prev_feature[key])
                end
            end if prev_feature

            # write the slice to the response as JSON in chunks
            chunk_s = StringIO::new()

            slice.each do |feature|
                chunk_s << "," if prev_feature
                chunk_s << feature.to_json

                prev_feature = feature
                remaining -= 1
            end

            response.stream.write chunk_s.string
        end

        response.stream.write "]"
        response.stream.close
    end

    def create
        @feature = Feature.new(params[:feature]&.permit(:network_id, :data, :created_at))
        @feature[:data] = Base64.decode64(@feature[:data])

        head @feature.save ? :ok : :bad_request
    end
end
