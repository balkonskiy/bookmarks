class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :links, dependent: :destroy
  has_many :lists, dependent: :destroy
  has_many :tweets, dependent: :destroy


  def self.from_omniauth(auth)
    user = find_or_create_by(uid: auth.uid, provider: auth.provider)
    user.oauth_token = auth['credentials']['token']
    user.oauth_secret = auth['credentials']['secret']
    user.save!
    user
  end

  def self.new_with_session(params, session)
    if session['devise.user_attributes']
      new(session['devise.user_attributes'], without_protection: true) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end

  def password_required?
    super && provider.blank?
  end

  def twitter
    if provider == "twitter"
      @twitter = Twitter::REST::Client.new do |config|
        config.consumer_key        = 'dgQmVubATe2FgbkrC5gsPQ'
        config.consumer_secret     = 'UCVhQwfwsqJtKrWTpgMzxXPrxstHhcqJMc5bs4mjs'
        config.access_token        = oauth_token
        config.access_token_secret = oauth_secret
      end
    end
  end

end
