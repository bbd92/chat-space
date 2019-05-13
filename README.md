# DB設計

## users table
|Column|Type|Options|index|
|------|----|-------|-----|
|name|string|null: false|○|
|adress|string|null: false, unipue: true|-|
|password|string|null: false|-|

### association
- has_many: messages
- has_many: groups, through: :members
- has_many: members

## groups table
|Column|Type|Options|index|
|------|----|-------|-----|
|name|string|null: false|-|

### association
- has_many: messages
- has_many: users, through: :members
- has_many: members

## messages table
|Column|Type|Options|index|
|------|----|-------|-----|
|body|text||○[^1]|
|image|string||○[^1]|
|user_id|integer|foreign_key: true|○[^1]|
|group_id|integer|foreign_key: false|-|
[^1]:連結index

### association
- belongs_to: user
- belongs_to: group

## members table
|Column|Type|Options|index|
|------|----|-------|-----|
|user_id|integer|nill: false, foreign_key: true|○|
|group_id|integer|nill:false, foreign_key: true|○|

### association
- belongs_to: user
- belongs_to: group