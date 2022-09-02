class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :password_confirmation, presence: true
  validates :email, presence: true
  validates :password, length: {minimum: 6}
  validates :password_confirmation, length: {minimum: 6}
  validates :email, uniqueness: { case_sensitive: false }

  def self.authenticate_with_credentials(email, password)
    @user = User.find_by(email: email.strip.downcase)
    if @user && @user.authenticate(password)
      return @user
    else
      return nil
    end
  end
end
