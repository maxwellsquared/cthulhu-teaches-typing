class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true
  validates :email, uniqueness: { case_sensitive: false }

  has_many :submissions

  def self.authenticate_with_credentials(email, password)
    @user = User.find_by(email: email.strip.downcase)
    if @user && @user.authenticate(password)
      return @user
    else
      return nil
    end
  end
end

# curl POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name":"my_login","password":"my_password","email":"myemail"}' -v