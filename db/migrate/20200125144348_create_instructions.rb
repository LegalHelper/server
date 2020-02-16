class CreateInstructions < ActiveRecord::Migration[6.0]
  def change
    create_table :instructions do |t|
      t.string :title
      t.string :instruction_type, default: 'fast'
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
