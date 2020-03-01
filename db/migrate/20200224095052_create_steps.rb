class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.integer :parent
      t.string :title, default: ''
      t.text :description, default: ''
      t.string :image
      t.integer :children, array: true, default: []
      t.references :instruction

      t.timestamps
    end
  end
end
