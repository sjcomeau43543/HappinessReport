import csv

# years we want
years = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']

# define the dictionary to add the values to, one for each country
countries = {}
with open("codes.csv", "rb") as codes:
	reader = csv.reader(codes)
	for row in reader:
		countries[row[0]] = {   '2008':{},
					'2009':{},
					'2010':{},
					'2011':{},
					'2012':{},
					'2013':{},
					'2014':{},
					'2015':{},
					'2016':{}}


# happiness
with open("happiness-cantril-ladder.csv", "rb") as happiness:
	reader = csv.reader(happiness)
	for row in reader:
		if row[1] in countries.keys():
			if row[2] in countries.get(row[1]).keys(): # we only want data 2008-2016
				countries.get(row[1]).get(row[2])['happiness'] = float(row[3])

# population, gdp, inflation, unemployment
with open("GDP_I_Pop_Unemp.csv", "rb") as stats:
	reader = csv.reader(stats)
	for row in reader:
		if row[0] in countries.keys():
			if(row[2] == 'Population'):
				for i in range(9):
					if(row[i+15] != 'n/a' and row[i+15] != None):
						countries.get(row[0]).get(years[i])['population'] = float(row[i+15]) * 1000000
					else:
						countries.get(row[0]).get(years[i])['population'] = -1.
					
			elif(row[2] == 'Gross domestic product constant prices'):
				for i in range(9):
					if(row[i+15] != 'n/a' and row[i+15] != None):
						countries.get(row[0]).get(years[i])['gdp'] = float(row[i+15]) * 1000000000
					else:
						countries.get(row[0]).get(years[i])['gdp'] = -1.	
			elif(row[2] == 'Inflation average consumer prices'):
				for i in range(9):
					if(row[i+15] != 'n/a' and row[i+15] != None):
						countries.get(row[0]).get(years[i])['inflation'] = float(row[i+15])
					else:
						countries.get(row[0]).get(years[i])['inflation'] = -1.
			elif(row[2] == 'Unemployment rate'):
				for i in range(9):
					if(row[i+15] != 'n/a' and row[i+15] != None):
						countries.get(row[0]).get(years[i])['unemployment'] = float(row[i+15])
					else:
						countries.get(row[0]).get(years[i])['unemployment'] = -1.


# alcohol consumption
with open("alcohol_consumption.csv", "rb") as alc:
	reader = csv.reader(alc)
	for row in reader:
		if row[1] in countries.keys():
			for i in range(9):
				if(row[i+2] != '' and row[i+2] != None):
					countries.get(row[1]).get(years[i])['alcohol_consumption'] = float(row[i+2])
				else:
					countries.get(row[1]).get(years[i])['alcohol_consumption'] = -1.


# write the new file
files = ['2008.csv', '2009.csv', '2010.csv', '2011.csv', '2012.csv', '2013.csv', '2014.csv', '2015.csv', '2016.csv']
for i in range(9):
	with open(files[i], "wb") as new:
		writer = csv.writer(new)
		writer.writerow(['code', 'happiness', 'gdp', 'population', 'inflation', 'unemployment', 'alcohol'])
		for key in countries.keys():
			for year in countries.get(key):
				if year == years[i]:
					writer.writerow([
						key,
						countries.get(key).get(year).get('happiness'),
						countries.get(key).get(year).get('gdp'),
						countries.get(key).get(year).get('population'),
						countries.get(key).get(year).get('inflation'),
						countries.get(key).get(year).get('unemployment'),
						countries.get(key).get(year).get('alcohol_consumption')])
						
						






