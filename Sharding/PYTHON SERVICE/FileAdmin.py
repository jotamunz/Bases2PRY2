from FileReader import FileReader
import time
import os

class FileAdmin:
  """This class is a thread that helps the service to keep
      checking the files on two folder are equal, if not
      the database has not uploaded the required info"""
  
  def __init__(self, read_directory, write_directory,hostname):
    self.read_directory = read_directory
    self.write_directory = write_directory
    self.service_state = False
    self.fileReader = FileReader()
    self.fileReader.set_read_directory(read_directory)
    self.fileReader.set_write_directory(write_directory)
    self.fileReader.set_hostname(hostname)
  
  def change_serviceState(self):
    self.service_state = not self.service_state
    print(f'Service is in {self.service_state} state')
  
  #Test
  def check_file(self):
    while self.service_state == True:
      print('Checking...')
      # self.mirror_folders()
      self.upload_to_folder()
      time.sleep(5)

  def print_readFiles(self):
    files_read = os.listdir(self.read_directory)
    files_write = os.listdir(self.write_directory)

    #print(f'Amount of read files is {len(files_read)}')
    #print(f'Amount of write files is {len(files_write)}')

  # Gets json, csv and txt from read_directory 
  def get_files(self, directory):
    files_read = os.listdir(directory)
    files_with_format = []

    for f in files_read:
      name_spaces = f.split(".")
      if name_spaces[-1] == "json" or name_spaces[-1] == "csv" or name_spaces[-1] == "txt":
        files_with_format.append(f)
        # print(f)

    return files_with_format
    
  def mirror_folders(self):
    files_read = self.get_files(self.read_directory)
    files_write = self.get_files(self.write_directory)
    

    if len(files_read) == len(files_write):
      print('Folders are up to date!!!')
    else:
      missing_files = self.find_missing_files(files_read,files_write)
      for f in missing_files:
        #read file 
        os.chdir(self.read_directory)
        file = open(f,'r')
        file_data = file.read()
        #write file
        os.chdir(self.write_directory)
        with open(f,'w') as fw:
          fw.write(file_data)

  def upload_to_folder(self):
    files_read = self.get_files(self.read_directory)
    files_write = self.get_files(self.write_directory)

    if len(files_read) == len(files_write):
      print('Folders are up to date!!!')
    else:
      missing_files = self.find_missing_files(files_read,files_write)
      for f in missing_files:
        self.fileReader.upload_files(str(f))
        #print(f)

        
    
  def find_missing_files(self,files_read,files_write):
    missing_files = []
    for f in files_read:
      if f not in files_write:
        missing_files.append(f)
        print(f'Missing file: {f}')   
    
    return missing_files


  

