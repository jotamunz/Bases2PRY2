from Formatter import Formatter
import subprocess
import json
import csv
import os


class FileReader:
    """ Reads csv and Json files. The objects of this class
        are capable of loading those files in a json array
        to a MongoDB shard. """

    def __init__(self):
        self.read_directory = None
        self.write_directory = None
        self.hostname = None
        self.formatter = Formatter()

    def upload_files(self, file_name):
        try:
            os.chdir(self.read_directory)
            f = open(file_name)

            name_pieces = file_name.split(".")
            if name_pieces[-1] == "json" or name_pieces[-1] == "txt":
              self.upload_json(file_name)
              print("Files uploaded to database!!!")
            elif name_pieces[-1] == "csv":
              self.upload_csv(file_name)
              print("Files uploaded to database!!!")
            else:
              print("ERROR: File format not valid!")     
        except IOError:
            print(file_name)
            print("ERROR: File does not exist")

    def upload_json(self, file_name):
        """ This method upload the files in the directory\filename 
            to the mongo database with mongoimport.exe"""
        #variables
        newJsonArray = []
        money_str = ''
        
        # read file
        print(str(self.read_directory))
        os.chdir(self.read_directory)
        jsonFile = open(file_name, 'r', encoding='utf-8')
        jsonData = jsonFile.read()
        
        # parse file
        jsonObject = json.loads(jsonData)
        
        #Save formatted json in other folder
        os.chdir(self.write_directory)

        #Format the json into a json for the datawarehouse
        for json_file in jsonObject['Data']:
            #print(json_file)
            if 'Moneda' in json_file:
                newJson = {
                    #"Factura": json_file['Factura'],
                    "Fecha": json_file['Fecha'][0: 4]+ '-' + json_file['Fecha'][4: 6] + '-' + json_file['Fecha'][6:],
                    "FechaVencimiento": json_file['FechaVencimiento'][0: 4]+ '-' + json_file['FechaVencimiento'][4: 6] + '-' + json_file['FechaVencimiento'][6:],
                    "Cliente": json_file['Cliente'],
                    "Producto": json_file['Producto'],
                    "Cantidad": json_file['Cantidad'].replace(',', ''),
                    "Moneda": json_file['Moneda'],
                    "Precio": json_file['Precio'].replace(',', ''),
                    "Total": str(float(json_file['Precio'].replace(',', '')) * float(json_file['Cantidad'].replace(',', ''))),
                    "Almacen": json_file['Almacén'],
                    "Vendedor": json_file['Vendedor'],
                    "TotalUSD": json_file['TotalUSD'].replace(',', ''),
                    "Impuesto": json_file['Impuesto'].replace(',', ''),
                    "ImpuestoUSD": json_file['ImpuestoUSD'].replace(',', ''),
                    "Tipo de cambio": json_file['Tipo de cambio'].replace(',', ''),
                    "Ganacia": json_file['Ganacia'].replace(',', ''),
                    "GananciaUSD": json_file['GananciaUSD'].replace(',', '')
                }
                newJsonArray.append(newJson)



        with open(file_name, "w") as f:
          json.dump(newJsonArray, f, ensure_ascii=False, indent=4) #Because of the document json format

        #Once the document is saved and formatted, it can be read by mongoimport.exe
        filename_path = str(self.get_write_directory()) + '\\'+ file_name
        cmd_command_0 = 'mongoimport ' + filename_path + ' --host "' + self.hostname + '" -d test -c blog_posts --jsonArray'
        #this should be a dinamic vairiable
        cmd_command_1 = 'mongoimport ' + filename_path + ' --host "' + self.hostname + '" -d test -c new_posts --jsonArray' 
        
        #Access mongoimport.exe
        os.chdir('C:\Program Files\MongoDB\Server')
        subprocess.run(cmd_command_0)
        subprocess.run(cmd_command_1)

    def upload_csv(self, file_name):
        """ This method upload the files in the directory\filename 
            to the mongo database with mongoimport.exe"""

        #variables
        newJsonArray = []
        print(self.formatter.formatDate('01','jul-19'))
        print("entreeee")

        # read file
        print(str(self.read_directory))
        os.chdir(self.read_directory)

        #Making the JSON
        with open(file_name, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=';')
            for json_file in reader:
                newJson = {
                    #"Factura": json_file['Factura'],
                    "Fecha": self.formatter.formatDate(json_file['Dia'],json_file['Fecha']),
                    "FechaVencimiento": self.formatter.formatDate(json_file['DiaVence'],json_file['FechaVence']),
                    "Cliente": self.formatter.formatClient(json_file['Cliente']),
                    "Producto": self.formatter.formatProduct(json_file['Producto']),
                    "Cantidad": self.formatter.formatNumeric(json_file['Cantidad']),
                    "Moneda": self.formatter.formatMoney(json_file['Moneda']),
                    "Precio": str(float(self.formatter.formatNumeric(json_file['Total'])) / float(self.formatter.formatNumeric(json_file['Cantidad']))),
                    "Total": self.formatter.formatNumeric(json_file['Total']),
                    "Almacen": self.formatter.formatStorage(json_file['Almacén']),
                    "Vendedor": json_file['Vendedor'],
                    "TotalUSD": self.formatter.formatNumeric(json_file['TotalUSD']),
                    "Impuesto": self.formatter.formatNumeric(json_file['Impuesto']),
                    "ImpuestoUSD": self.formatter.formatNumeric(json_file['ImpuestoUSD']),
                    "Tipo de cambio": json_file['Tipo de cambio'],
                    "Ganacia": self.formatter.formatNumeric(json_file['Ganacia']),
                    "GananciaUSD": self.formatter.formatNumeric(json_file['GananciaUSD'])
                }
                newJsonArray.append(newJson)  

        file_name = self.formatter.formatFileType(file_name,'json')

        # save file
        os.chdir(self.get_write_directory())
        with open(file_name, "w") as f:
          json.dump(newJsonArray, f, ensure_ascii=False, indent=4) #Because of the document json format


        filename_path = str(self.get_write_directory()) + '\\'+ file_name
        cmd_command_0 = 'mongoimport ' + filename_path + ' --host "' + self.hostname + '" -d test -c blog_posts --jsonArray'
        #this should be a dinamic vairiable
        cmd_command_1 = 'mongoimport ' + filename_path + ' --host "' + self.hostname + '" -d test -c new_posts --jsonArray' 

        #Access mongoimport.exe
        os.chdir('C:\Program Files\MongoDB\Server')
        subprocess.run(cmd_command_0)
        subprocess.run(cmd_command_1)

    # Setters
    def set_read_directory(self, read_directory):
        self.read_directory = read_directory

    def set_write_directory(self, write_directory):
        self.write_directory = write_directory

    def set_hostname(self, hostname):
        self.hostname = hostname

    # Getters
    def get_write_directory(self):
      return self.write_directory

    def get_read_directory(self):
        return self.read_directory

    def get_hostname(self):
        return self.hostname
