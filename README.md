# DB設計

## users table
|Column|Type|Options|
|------|----|------|
|name|string|null: false|
|adress|string|null: false, unipue: true|
|password|string|null: false|

### association
- has_many: messages
- has_many: groups, through: :members
- has_many: members

## groups table
|Column|Type|Options|
|------|----|------|
|name|string|null: false|

### association
- has_many: messages
- has_many: users, through: :members
- has_many: members

## messages table
|Column|Type|Options|
|------|----|------|
|body|text||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: false|

### association
- belongs_to: user
- belongs_to: group

## members table
|Column|Type|Options|
|------|----|------|
|user_id|integer|nill: false, foreign_key: true|
|group_id|integer|nill:false, foreign_key: true|

### association
- belongs_to: user
- belongs_to: group