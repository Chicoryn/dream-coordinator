class Features < ActiveRecord::Migration[5.2]
  def change
    create_table :features do |t|
      t.belongs_to :network, index: true

      t.binary :data, :limit => 16.megabyte
      t.timestamps
    end

    add_foreign_key :features, :networks, column: :network_id
  end
end
