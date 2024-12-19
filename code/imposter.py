from random import randint
itemf = open("items.txt","r")
itemlist = itemf.read().split("\n")
itemf.close()
randitemnum=randint(0,len(itemlist)-1)
item = itemlist[randitemnum]

numf = open("numbers.txt", "r")
numlist= numf.read().split()
numf.close()

master = randint(0,len(numlist)-1)
outlist = []
outlist.append([numlist.pop(master),' master ',item,'\n'])

imposter = randint(0,len(numlist)-1)
outlist.append([numlist.pop(imposter),' imposter ',item,'\n'])

outf = open("out.txt", "w")

for i in range (0,len(numlist)):
  outlist.append([numlist[i],' commoner\n'])

for x in range (0,len(outlist)):
	outf.writelines(outlist[x])
outf.close()