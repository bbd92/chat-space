## users table
|Column|Type|Options|
|------|----|------|
|name|string|null: false|
|adress|string|null: false, unipue: true|
|password|string|null: false|

## groups table
|Column|Type|Options|
|------|----|------|
|name|string|null: false|

## messages table
|Column|Type|Options|
|------|----|------|
|body|text||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: false|

## users_groups table
|Column|Type|Options|
|------|----|------|
|user_id|integer|nill: false, foreign_key: true|
|group_id|integer|nill:false, foreign_key: true|