class Networks < ActiveRecord::Migration[5.2]
  def change
    create_table :networks do |t|
      t.string :name
      t.float  :elo
      t.binary :data, :limit => 32.megabyte
      t.timestamps
    end
  end
end
