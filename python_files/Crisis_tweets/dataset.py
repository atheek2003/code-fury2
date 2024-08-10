## This file is to make changes into the Kaggle dataset and combining it various other datasets oN Disaster tweets
import numpy as np 
import pandas as pd
import random
import os

def add_positives(df,data,n):
    for i in range (0,n):
        if (data['relevance'][i] == 1):
            df.loc[len(df)+i] = {'text':data['text'][i],'target':data['relevance'][i] }
    print(df['target'].value_counts())

def final_dataset(df):
    os.chdir(r"tweets\incident-tweets")  # save the other tweets in this directory and list them and add tweets from them
    for fname in os.listdir("."):
        data = pd.read_json(fname,lines=True)
        add_positives(df,data,800) # You change this function to add positive / negative or all tweets
    df.to_csv('crisis_Tweets.csv') # save as csv


if __name__ == "__main__":
    df = pd.read_csv(r"tweets\small files\crisis_Tweets.csv", on_bad_lines='skip')
    final_dataset(df)