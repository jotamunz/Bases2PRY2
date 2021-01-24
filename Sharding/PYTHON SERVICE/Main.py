from FileReader import FileReader
from FileAdmin import FileAdmin
import threading
import time
# fileReader = FileReader()
# fileReader.set_read_directory('C:\data\save')
# fileReader.set_write_directory('C:\data\write')
# fileReader.set_hostname('localhost:20006')
# fileReader.upload_json('mongo_101_200.json')
#fileReader.upload_csv('database.csv')
#fileReader.upload_files('mongo_101_200.json')

#a = FileAdmin('C:\data\save','C:\data\write')
#a.change_serviceState()
#t1 = threading.Thread(target=a.check_file)
#t1.start()
#a.print_readFiles()
#a.get_files(a.write_directory)
#a.mirror_folders()

fileAdmin = FileAdmin('C:\data\save','C:\data\write','localhost:20006')
fileAdmin.change_serviceState()
t1 = threading.Thread(target=fileAdmin.check_file)
t1.start()
# batch que corra python para activar el ETL

                           