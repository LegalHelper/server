class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.integer :parent
      t.string :title
      t.text :description,
      t.string: :image,
      t.integer :children, array: true, default: []

      t.timestamps
    end
  end
end
