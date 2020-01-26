class CreateInstructions < ActiveRecord::Migration[6.0]
  def change
    create_table :instructions do |t|
      t.string :instruct_type
      t.boolean :root, default: false
      t.string :title
      t.text :text
      t.integer :children, array: true, default: []

      t.timestamps
    end
  end
end
