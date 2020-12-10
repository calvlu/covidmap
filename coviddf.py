import numpy as np
import pandas as pd

nytcovid = pd.read_csv("./Downloads/us-states.csv")
colorstate = pd.read_csv("./Downloads/colorstate.csv")
statepop = pd.read_csv("./Downloads/statepop.csv")

statepop["Population"] = statepop["Population"].replace(',','', regex=True).astype(int)
newdf= pd.merge(colorstate, statepop, on='state')

nytcovid['month'] = pd.DatetimeIndex(nytcovid['date']).month
nytcovid['month_name'] = pd.DatetimeIndex(nytcovid['date']).month_name()
nytcovid.head(10)

covidmonthly = nytcovid[['state','month','cases','month_name','fips']].groupby(['state', 'month'],as_index=False).max()
covidmonthly.head(20)

covidmonthly["new_cases"] = covidmonthly[["cases",'state']].groupby(['state']).diff()
covidmonthly.head(20)

df = pd.merge(covidmonthly, newdf, on='state')

df["case_rate"] = df["new_cases"] / df["Population"] * 100000
df

hotspots = df[df['case_rate'] > 500].sort_values(by=['month'])
hotspots.head(20)
#df.groupby(['color','month']).sum()
#add up population for new bluestate redstate rate

df.to_csv('./Downloads/covidmonthly.csv')
hotspots.to_csv('./Downloads/hotspots.csv')