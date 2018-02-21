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
					if(row[i+15] != 'n/a'):
						countries.get(row[0]).get(years[i])['population'] = float(row[i+15]) * 1000000
					else:
						countries.get(row[0]).get(years[i])['population'] = -1.
					
			elif(row[2] == 'Gross domestic product constant prices'):
				for i in range(9):
					if(row[i+15] != 'n/a'):
						countries.get(row[0]).get(years[i])['gdp'] = float(row[i+15]) * 1000000000
					else:
						countries.get(row[0]).get(years[i])['gdp'] = -1.	
			elif(row[2] == 'Inflation average consumer prices'):
				for i in range(9):
					if(row[i+15] != 'n/a'):
						countries.get(row[0]).get(years[i])['inflation'] = float(row[i+15])
					else:
						countries.get(row[0]).get(years[i])['inflation'] = -1.
			elif(row[2] == 'Unemployment rate'):
				for i in range(9):
					if(row[i+15] != 'n/a'):
						countries.get(row[0]).get(years[i])['unemployment'] = float(row[i+15])
					else:
						countries.get(row[0]).get(years[i])['unemployment'] = -1.


# alcohol consumption
with open("alcohol_consumption.csv", "rb") as alc:
	reader = csv.reader(alc)
	for row in reader:
		print row
		if row[1] in countries.keys():
			for i in range(9):
				if(row[i+2] != ''):
					countries.get(row[1]).get(years[i])['alcohol_consumption'] = float(row[i+2])
				else:
					countries.get(row[1]).get(years[i])['alcohol_consumption'] = -1.


print countries


'''
# remove the unneeded sets from the sets.csv file
set_values = []
with open("data/sets.csv", "rb") as sets:
	set_reader = csv.reader(sets)
	for set_row in set_reader:
		set_values.append(set_row[0])

inventory_ids = []
set_values_inv = []
with open("data/inventories.csv", "rb") as inventories:
	reader = csv.reader(inventories)
	for inv_row in reader:
		if inv_row[1] in set_values:
			inventory_ids.append(inv_row[0])
			set_values_inv.append(inv_row[1])


with open("data/sets.csv", "rb") as sets, open("data/sets_updated.csv", "wb") as sets_updated:
	set_reader = csv.reader(sets)
	set_writer = csv.writer(sets_updated)

	#manually add the headers after

	for row in set_reader:
		for i in range(len(set_values_inv)):
			git puif row[0] == set_values_inv[i]:
				set_writer.writerow([inventory_ids[i], row[1], row[2], row[3], row[4]]);
'''





