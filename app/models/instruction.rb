class Instruction < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :steps, dependent: :destroy

end
