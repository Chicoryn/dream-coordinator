class CreateNetworks < ActiveRecord::Migration[5.2]
  def change
    create_table :networks do |t|
      t.string :name
      t.binary :data

      t.timestamps
    end
  end
end
