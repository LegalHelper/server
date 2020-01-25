class CreateInstructions < ActiveRecord::Migration[6.0]
  def change
    create_table :instructions do |t|
      t.string :type
      t.boolean :root
      t.string :title
      t.text :text
      t.integer :children, array: true, default: []

      t.timestamps
    end
  end
end
