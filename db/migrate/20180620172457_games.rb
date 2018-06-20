class Games < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.belongs_to :network, index: true

      t.string :category
      t.binary :data, :limit => 16.megabyte
      t.timestamps
    end

    add_foreign_key :games, :networks, column: :network_id
  end
end
