# Natively, Enumerators get JSONized like "#<Enumerator::Lazy:0x007f8714807080>", or they explode, either of which is a problem.
# We want them to make an array, and do it lazily so we don't have to keep the items in memory!
class Enumerator
    def to_json(options)
        string = "["
        first_item = true

        self.each do |item|
            separator = "," unless first_item
            string << "#{separator}#{item.as_json.to_json(options)}"
            first_item = false
        end

        string << "]"
    end
end
