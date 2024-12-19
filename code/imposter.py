itemf = open("items.txt","r")
itemlist = itemf.read().split("\n")
itemf.close()

item = itemlist[randnum(0,len(itemlist))]

numf = open("numbers.txt", "r")
numlist= numf.read().split()
numf.close()

master = randnum(0,len(numlist))
outlist[0] = [numlist.pop(master),item]

imposter = randnum(0,len(numlist))
outlist[1] = [numlist.pop(imposter),item]

outf = open("out.txt", "w")

for i in range (0,len(numlist))
  outlist[i+1] = [numlist[i],item]
  
f.write(outlist)
f.close()
