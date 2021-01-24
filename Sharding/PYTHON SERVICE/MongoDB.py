import pymongo
from pymongo import MongoClient

connection = MongoClient('localhost',20006)
database = connection["test"]
collection = database["new_posts"]

x = collection.delete_many({})
print(x.deleted_count, " documents deleted.")


