class Formatter:
  """This class is for format functions"""

  def formatDate(self, day,string_date):
    split_date = string_date.split("-")
    
    year = "20" + split_date[-1]
    month = "00"
    
    if split_date[0] == "ene":
      month = "01"
    elif split_date[0] == "feb":
      month = "02"
    elif split_date[0] == "mar":
      month = "03"
    elif split_date[0] == "abr":
      month = "04"
    elif split_date[0] == "may":
      month = "05"
    elif split_date[0] == "jun":
      month = "06"
    elif split_date[0] == "jul":
      month = "07"
    elif split_date[0] == "ago":
      month = "08"
    elif split_date[0] == "sep":
      month = "09"
    elif split_date[0] == "oct":
      month = "10"
    elif split_date[0] == "nov":
      month = "11"
    elif split_date[0] == "dic":
      month = "12"

    return  year + '-' + month + '-' + (day if len(day) > 1 else '0'+ day) 

  def formatClient(self,clientCode):
    
    digitTotal = 4
    if len(clientCode) < 4:
      return 'C0' + clientCode
    return 'C' + clientCode

  def formatMoney(self,moneyString):
    if moneyString == 'colones':
      return 'CRC'
    else:
      return 'USD'

  def formatNumeric(self,numericString):
    count = numericString.count('.')
    if count > 1:
      numericString = numericString.replace('.','',count-1)
    return numericString.replace(',', '')

  def formatFileType(self,filename,filetype):
    split_name = filename.split('.')
    return split_name[0] + "." + filetype
  
  def addCeros(self,desiredLen,string):
    if len(string) >= desiredLen:
      return string
    else:
      quantityCeros = desiredLen - len(string)
      return "0" * quantityCeros + string

  def formatStorage(self, storageNum):
    return self.addCeros(2,storageNum)

  def formatProduct(self,productCode):
    return self.addCeros(7,productCode)
    


